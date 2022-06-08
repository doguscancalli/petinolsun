import { advancedFiltering } from '@utils'
import Report from '../models/Report'
import { GraphQLYogaError } from '@graphql-yoga/node'

export default {
  Query: {
    reports: async (_, args, context) => {
      const { input } = args
      await context.isAuth(context)
      context.isAdmin(context)
      const populate = [
        {
          path: 'reportedBy',
          select: 'name email',
        },
        {
          path: 'reportedTopicId',
          select: 'name title slug',
        },
      ]
      const reports = await advancedFiltering(Report, input, populate)
      return reports
    },
  },
  Mutation: {
    createReport: async (_, args) => {
      const { input } = args
      const isDuplicate = await Report.findOne({
        reportedBy: input.reportedBy,
        reportedTopic: input.reportedTopic,
        reportedTopicId: input.reportedTopicId,
      })
      if (isDuplicate) throw new GraphQLYogaError('Zaten rapor edilmiş')
      const report = await Report.create(input)
      return report
    },
    deleteReport: async (_, args, context) => {
      const { id } = args
      await context.isAuth(context)
      context.isAdmin(context)
      const report = await Report.findById(id)
      if (!report) throw new GraphQLYogaError('Rapor bulunamadı')
      await report.remove()
      return true
    },
    deleteAllReports: async (_, __, context) => {
      await context.isAuth(context)
      context.isAdmin(context)
      await Report.deleteMany({})
      return true
    },
  },
}
