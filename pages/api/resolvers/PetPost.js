import { advancedFiltering } from '@utils'
import PetPost from '../models/PetPost'

export default {
  Query: {
    petPosts: async (_, args) => {
      const { input } = args
      const { limit, page } = input

      const filter = advancedFiltering(input)

      const petPost = await PetPost.paginate(filter, {
        limit,
        page,
        sort: { createdAt: -1 },
        populate: {
          path: 'user',
          select: 'name',
        },
      })
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
      const { id } = context.isAuth(context)
      const petPost = await PetPost.create({ ...input, user: id })
      return petPost
    },
    updatePetPost: async (_, args, context) => {
      const { id, input } = args
      const { id: authUserId, isAdmin } = context.isAuth(context)
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
      const { id: authUserId, isAdmin } = context.isAuth(context)
      const petPost = await PetPost.findById(id)
      if (!petPost) throw new Error('İlan bulunamadı')
      if (petPost.user.toString() !== authUserId && !isAdmin)
        throw new Error('Sadece kendi ilanlarınızı silebilirsiniz')
      await petPost.remove()
      return true
    },
    deleteAllPetPosts: async (_, __, context) => {
      context.isAuth(context)
      context.isAdmin(context)
      await PetPost.deleteMany({})
      return true
    },
  },
}
