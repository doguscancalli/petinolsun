import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema(
  {
    reportedBy: { type: String, required: false },
    reportedTopic: { type: String, required: true },
    reportedTopicId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Report || mongoose.model('Report', ReportSchema)
