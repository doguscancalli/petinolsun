import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

import User from '../models/User'

import {
  generateToken,
  sendEmail,
  validateRegisterInput,
  validateLoginInput,
} from '@utils'

export default {
  Query: {
    users: async (_, __, context) => {
      context.isAuth(context)
      context.isAdmin(context)
      const users = await User.find({})
      return users
    },
    user: async (_, args, context) => {
      const { id } = args
      context.isAuth(context)
      context.isAdmin(context)
      const user = await User.findById(id)
      if (!user) throw new Error('Kullanıcı bulunamadı')
      return user
    },
    me: async (_, __, context) => {
      const { id } = context.isAuth(context)
      const user = await User.findById(id)
      if (!user) throw new Error('Kullanıcı bulunamadı')
      return user
    },
  },
  Mutation: {
    registerUser: async (_, args) => {
      const {
        input: { name, email, password },
      } = args
      {
        const { valid, errors } = validateRegisterInput(name, email, password)
        if (!valid) throw new Error(Object.values(errors))
        const user = await User.findOne({ email })
        if (user) throw new Error('Bu eposta kullanılıyor')
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
      const {
        input: { email, password },
      } = args
      const { errors, valid } = validateLoginInput(email, password)
      if (!valid) throw new Error(Object.values(errors))
      const user = await User.findOne({ email }).select('+password')
      if (!user) {
        errors.general = 'Kullanıcı bulunamadı'
        throw new Error(Object.values(errors))
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Kullanıcı bilgileri hatalı'
        throw new Error(Object.values(errors))
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
      context.isAuth(context)
      context.isAdmin(context)
      const user = await User.findById(id)
      if (!user) throw new Error('Kullanıcı bulunamadı')
      await user.remove()
      return true
    },
    deleteAllUsers: async (_, __, context) => {
      context.isAuth(context)
      context.isAdmin(context)
      await User.deleteMany({})
      return true
    },
    updateUser: async (_, args, context) => {
      const {
        id,
        input: { name, email },
      } = args
      const { id: authUserId, isAdmin } = context.isAuth(context)
      if (id !== authUserId && !isAdmin)
        throw new Error('Sadece kendi hesabınızı güncelleyebilirsiniz')
      const user = await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true }
      )
      if (!user) throw new Error('Kullanıcı bulunamadı')
      return user
    },
    forgotPassword: async (_, args) => {
      const { email } = args
      const user = await User.findOne({ email })
      if (!user) throw new Error('Kullanıcı bulunamadı')
      const resetToken = nanoid(64)
      user.resetPasswordToken = resetToken
      user.resetPasswordExpire = Date.now() + 10 * 60 * 1000
      await user.save()
      const resetUrl = `${process.env.APP_BASE_URL}/sifre-sifirlama?token=${resetToken}`
      const message = `Bu epostayı, siz (veya bir başkası) şifrenizin sıfırlanmasını talep ettiği için alıyorsunuz. Şifrenizi sıfırlamak bu linke gidin:\n\n${resetUrl}`
      await sendEmail({
        email,
        subject: 'Şifre Sıfırlama',
        message,
      })
      return true
    },
    resetPassword: async (_, args) => {
      const { token, password } = args
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() },
      })
      if (!user) throw new Error('Token geçersiz')
      const hashedPassword = await bcrypt.hash(password, 12)
      user.password = hashedPassword
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      await user.save()
      return true
    },
    updatePassword: async (_, args, context) => {
      const { password, newPassword } = args
      const { id } = context.isAuth(context)
      const user = await User.findById(id).select('+password')
      if (!user) throw new Error('Kullanıcı bulunamadı')
      if (!(await bcrypt.compare(password, user.password)))
        throw new Error('Şifre hatalı')
      const hashedPassword = await bcrypt.hash(newPassword, 12)
      user.password = hashedPassword
      await user.save()
      return true
    },
  },
}
