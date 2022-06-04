import Comment from '../models/Comment'
import PetPost from '../models/PetPost'
import Post from '../models/Post'
import Report from '../models/Report'
import User from '../models/User'

export default {
  Query: {
    counts: async (_, __, context) => {
      await context.isAuth(context)
      context.isAdmin(context)

      const userCount = await User.count({})
      const petPostCount = await PetPost.count({})
      const postCount = await Post.count({})
      const reportCount = await Report.count({})
      const commentCount = await Comment.count({})

      const counts = [
        {
          title: 'Toplam kullanıcılar',
          count: userCount,
        },
        {
          title: 'Toplam ilanlar',
          count: petPostCount,
        },
        {
          title: 'Toplam gönderiler',
          count: postCount,
        },
        {
          title: 'Toplam yorumlar',
          count: commentCount,
        },
        {
          title: 'Toplam raporlar',
          count: reportCount,
        },
      ]

      return {
        counts,
      }
    },
  },
}
