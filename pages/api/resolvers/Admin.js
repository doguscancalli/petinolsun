import Comment from '../models/Comment'
import PetPost from '../models/PetPost'
import Post from '../models/Post'
import Report from '../models/Report'
import SeoSettings from '../models/SeoSettings'
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
    seoSettings: async () => {
      const isSeoSettingsExists = await SeoSettings.count({})
      if (!isSeoSettingsExists) {
        await SeoSettings.create({
          title: 'title',
          description: 'description',
          keywords: 'keywords',
        })
      }
      let seoSettings = await SeoSettings.find({})
      seoSettings = seoSettings[0]
      return seoSettings
    },
  },
  Mutation: {
    updateSeoSettings: async (_, args, context) => {
      await context.isAuth(context)
      context.isAdmin(context)
      const { input } = args
      let seoSettings = await SeoSettings.find({})
      seoSettings = seoSettings[0]
      const updatedSeoSettings = await SeoSettings.findByIdAndUpdate(
        seoSettings.id,
        input,
        {
          new: true,
        }
      )
      return updatedSeoSettings
    },
  },
}
