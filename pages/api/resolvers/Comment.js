import { advancedFiltering } from '@utils'
import { validateCommentInput } from '@utils/validators'
import Comment from '../models/Comment'

export default {
  Query: {
    comments: async (_, args) => {
      const { input } = args
      const populate = {
        path: 'user',
        select: 'name',
      }
      const comments = await advancedFiltering(Comment, input, populate)
      return comments
    },
  },
  Mutation: {
    createComment: async (_, args, context) => {
      const { input } = args
      const { id } = await context.isAuth(context)
      const { valid, errors } = validateCommentInput(input)
      if (!valid) throw new Error(Object.values(errors))
      let comment = await Comment.create({ ...input, user: id })
      comment = await comment.populate({
        path: 'user',
        select: 'name',
      })
      return comment
    },
    updateComment: async (_, args, context) => {
      const { id, input } = args
      const { id: authUserId, isAdmin } = await context.isAuth(context)
      const comment = await Comment.findById(id)
      if (!comment) throw new Error('Yoruum bulunamadı')
      if (
        comment.createdAt.getTime() + 1800000 < new Date().getTime() &&
        !isAdmin
      )
        throw new Error('Yorum paylaşıldıktan 30 dakika içinde düzenlenebilir')
      if (comment.user.toString() !== authUserId && !isAdmin)
        throw new Error('Sadece kendi yorumunuzu güncelleyebilirsiniz')
      const updatedComment = await Comment.findByIdAndUpdate(id, input, {
        new: true,
      })
      return updatedComment
    },
    deleteComment: async (_, args, context) => {
      const { id } = args
      const { id: authUserId, isAdmin } = await context.isAuth(context)
      const comment = await Comment.findById(id)
      if (!comment) throw new Error('Yorum bulunamadı')
      if (comment.user.toString() !== authUserId && !isAdmin)
        throw new Error('Sadece kendi yorumunuzu silebilirsiniz')
      await comment.remove()
      return true
    },
    deleteAllComments: async (_, __, context) => {
      await context.isAuth(context)
      context.isAdmin(context)
      await Comment.deleteMany({})
      return true
    },
  },
}
