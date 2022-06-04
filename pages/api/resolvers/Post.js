import { advancedFiltering } from '@utils'
import { validatePostInput } from '@utils/validators'
import Post from '../models/Post'

export default {
  Query: {
    posts: async (_, args) => {
      const { input } = args
      const populate = {
        path: 'user',
        select: 'name',
      }
      const posts = await advancedFiltering(Post, input, populate)
      return posts
    },
    post: async (_, args) => {
      const { slug } = args
      const post = await Post.findOne({ slug }).populate({
        path: 'user',
        select: 'name',
      })
      if (!post) throw new Error('İlan bulunamadı')
      return post
    },
  },
  Mutation: {
    createPost: async (_, args, context) => {
      const { input } = args
      const { id } = await context.isAuth(context)
      const { valid, errors } = validatePostInput(input)
      if (!valid) throw new Error(Object.values(errors))
      let post = await Post.create({ ...input, user: id })
      post = await post.populate({
        path: 'user',
        select: 'name',
      })
      return post
    },
    updatePost: async (_, args, context) => {
      const { id, input } = args
      const { id: authUserId, isAdmin } = await context.isAuth(context)
      const post = await Post.findById(id)
      if (!post) throw new Error('Gönderi bulunamadı')
      if (post.createdAt.getTime() + 1800000 < new Date().getTime() && !isAdmin)
        throw new Error(
          'Gönderi paylaşıldıktan 30 dakika içinde düzenlenebilir'
        )
      if (post.user.toString() !== authUserId && !isAdmin)
        throw new Error('Sadece kendi gönderinizi güncelleyebilirsiniz')
      const updatedPost = await Post.findByIdAndUpdate(id, input, {
        new: true,
      })
      return updatedPost
    },
    deletePost: async (_, args, context) => {
      const { id } = args
      const { id: authUserId, isAdmin } = await context.isAuth(context)
      const post = await Post.findById(id)
      if (!post) throw new Error('Gönderi bulunamadı')
      if (post.user.toString() !== authUserId && !isAdmin)
        throw new Error('Sadece kendi gönderinizi silebilirsiniz')
      await post.remove()
      return true
    },
    deleteAllPosts: async (_, __, context) => {
      await context.isAuth(context)
      context.isAdmin(context)
      await Post.deleteMany({})
      return true
    },
  },
}
