import Report from '../models/Report'

export default {
  Query: {
    reports: async (_, __, context) => {
      context.isAuth(context)
      context.isAdmin(context)
      const reports = await Report.find({})
      return reports
    },
  },
  Mutation: {
    createReport: async (_, args) => {
      const { input } = args
      const report = await Report.create(input)
      return report
    },
    deleteReport: async (_, args, context) => {
      const { id } = args
      context.isAuth(context)
      context.isAdmin(context)
      const report = await Report.findById(id)
      if (!report) throw new Error('Rapor bulunamadı')
      await report.remove()
      return true
    },
    deleteAllReports: async (_, __, context) => {
      context.isAuth(context)
      context.isAdmin(context)
      await Report.deleteMany({})
      return true
    },
  },
}
