import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reportedTopicId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'reportedTopic',
      required: true,
    },
    reportedTopic: {
      type: String,
      required: true,
      enum: ['PetPost', 'Post'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Report || mongoose.model('Report', ReportSchema)
