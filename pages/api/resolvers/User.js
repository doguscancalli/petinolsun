import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import mail from '@sendgrid/mail'
import User from '../models/User'
import {
  generateToken,
  validateRegisterInput,
  validateLoginInput,
  advancedFiltering,
} from '@utils'
import { GraphQLYogaError } from '@graphql-yoga/node'

export default {
  Query: {
    users: async (_, args, context) => {
      const { input } = args
      await context.isAuth(context)
      context.isAdmin(context)
      const users = await advancedFiltering(User, input)
      return users
    },
    user: async (_, args, context) => {
      const { id } = args
      context.isAuth(context)
      context.isAdmin(context)
      const user = await User.findById(id)
      if (!user) throw new GraphQLYogaError('Kullanıcı bulunamadı')
      return user
    },
    me: async (_, __, context) => {
      const { id } = await context.isAuth(context)
      const user = await User.findById(id)
      if (!user) throw new GraphQLYogaError('Kullanıcı bulunamadı')
      return user
    },
  },
  Mutation: {
    registerUser: async (_, args) => {
      let {
        input: { name, email, password },
      } = args
      {
        email = email.toLowerCase()
        const { valid, errors } = validateRegisterInput(name, email, password)
        if (!valid) throw new GraphQLYogaError(Object.values(errors))
        const user = await User.findOne({ email })
        if (user) throw new GraphQLYogaError('Bu eposta kullanılıyor')
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
        })
        const res = await newUser.save()
        const token = generateToken(res)
        return {
          id: res._id,
          ...res._doc,
          token,
        }
      }
    },
    loginUser: async (_, args) => {
      let {
        input: { email, password },
      } = args
      email = email.toLowerCase()
      const { errors, valid } = validateLoginInput(email, password)
      if (!valid) throw new GraphQLYogaError(Object.values(errors))
      const user = await User.findOne({ email }).select('+password')
      if (!user) {
        errors.general = 'Kullanıcı bulunamadı'
        throw new GraphQLYogaError(Object.values(errors))
      }
      if (user.isBanned) {
        errors.general = 'Hesabınız engellenmiştir'
        throw new GraphQLYogaError(Object.values(errors))
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Kullanıcı bilgileri hatalı'
        throw new GraphQLYogaError(Object.values(errors))
      }
      const token = generateToken(user)
      return {
        id: user._id,
        ...user._doc,
        token,
      }
    },
    deleteUser: async (_, args, context) => {
      const { id } = args
      await context.isAuth(context)
      context.isAdmin(context)
      const user = await User.findById(id)
      if (!user) throw new GraphQLYogaError('Kullanıcı bulunamadı')
      await user.remove()
      return true
    },
    deleteAllUsers: async (_, __, context) => {
      await context.isAuth(context)
      context.isAdmin(context)
      await User.deleteMany({})
      return true
    },
    updateUser: async (_, args, context) => {
      let {
        id,
        input: { name, email, isAdmin, isBanned },
      } = args
      email = email.toLowerCase()
      const { id: authUserId, isAdmin: isAuthUserAdmin } = await context.isAuth(
        context
      )
      if (id !== authUserId && !isAuthUserAdmin)
        throw new GraphQLYogaError(
          'Sadece kendi hesabınızı güncelleyebilirsiniz'
        )
      const isEmailExist = await User.findOne({ email })
      if (isEmailExist) throw new GraphQLYogaError('Bu eposta kullanılıyor')
      let user
      if (isAuthUserAdmin) {
        user = await User.findByIdAndUpdate(
          id,
          { name, email, isAdmin, isBanned },
          { new: true }
        )
      } else {
        user = await User.findByIdAndUpdate(id, { name, email }, { new: true })
      }
      if (!user) throw new GraphQLYogaError('Kullanıcı bulunamadı')
      const token = generateToken(user)
      user.token = token
      return user
    },
    forgotPassword: async (_, args) => {
      let { email } = args
      email = email.toLowerCase()
      mail.setApiKey(process.env.SENDGRID_API_KEY)
      const user = await User.findOne({ email })
      if (!user) throw new GraphQLYogaError('Kullanıcı bulunamadı')
      const resetToken = nanoid(64)
      user.resetPasswordToken = resetToken
      user.resetPasswordExpire = Date.now() + 10 * 60 * 1000
      await user.save()
      const resetUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/sifre-sifirlama?token=${resetToken}`
      const text = `Bu epostayı, siz (veya bir başkası) şifrenizin sıfırlanmasını talep ettiği için alıyorsunuz. Şifrenizi sıfırlamak bu linke gidin:\n\n${resetUrl}`
      const data = {
        to: email,
        from: 'destek@petinolsun.com',
        subject: 'Şifre Sıfırlama',
        text,
      }
      try {
        await mail.send(data)
      } catch (err) {
        throw new GraphQLYogaError(err)
      }
      return true
    },
    resetPassword: async (_, args) => {
      const { token, password } = args
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() },
      })
      if (!user) throw new GraphQLYogaError('Token geçersiz')
      const hashedPassword = await bcrypt.hash(password, 12)
      user.password = hashedPassword
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      await user.save()
      return true
    },
    updatePassword: async (_, args, context) => {
      const { password, newPassword } = args
      const { id } = await context.isAuth(context)
      const user = await User.findById(id).select('+password')
      if (!user) throw new GraphQLYogaError('Kullanıcı bulunamadı')
      if (!(await bcrypt.compare(password, user.password)))
        throw new GraphQLYogaError('Şifre hatalı')
      const hashedPassword = await bcrypt.hash(newPassword, 12)
      user.password = hashedPassword
      await user.save()
      return true
    },
  },
}
