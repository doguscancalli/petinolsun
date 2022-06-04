import { advancedFiltering } from '@utils'
import { validatePetPostInput } from '@utils/validators'
import PetPost from '../models/PetPost'

export default {
  Query: {
    petPosts: async (_, args) => {
      const { input } = args
      const petPost = await advancedFiltering(PetPost, input)
      return petPost
    },
    petPost: async (_, args) => {
      const { slug } = args
      const petPost = await PetPost.findOne({ slug }).populate({
        path: 'user',
        select: 'name',
      })
      if (!petPost) throw new Error('İlan bulunamadı')
      return petPost
    },
  },
  Mutation: {
    createPetPost: async (_, args, context) => {
      const { input } = args
      const { id } = await context.isAuth(context)
      const { valid, errors } = validatePetPostInput(input)
      if (!valid) throw new Error(Object.values(errors))
      const petPost = await PetPost.create({ ...input, user: id })
      return petPost
    },
    updatePetPost: async (_, args, context) => {
      const { id, input } = args
      const { id: authUserId, isAdmin } = await context.isAuth(context)
      const petPost = await PetPost.findById(id)
      if (!petPost) throw new Error('İlan bulunamadı')
      if (petPost.user.toString() !== authUserId && !isAdmin)
        throw new Error('Sadece kendi ilanlarınızı güncelleyebilirsiniz')
      const updatedPetPost = await PetPost.findByIdAndUpdate(id, input, {
        new: true,
      })
      return updatedPetPost
    },
    deletePetPost: async (_, args, context) => {
      const { id } = args
      const { id: authUserId, isAdmin } = await context.isAuth(context)
      const petPost = await PetPost.findById(id)
      if (!petPost) throw new Error('İlan bulunamadı')
      if (petPost.user.toString() !== authUserId && !isAdmin)
        throw new Error('Sadece kendi ilanlarınızı silebilirsiniz')
      await petPost.remove()
      return true
    },
    deleteAllPetPosts: async (_, __, context) => {
      await context.isAuth(context)
      context.isAdmin(context)
      await PetPost.deleteMany({})
      return true
    },
  },
}
