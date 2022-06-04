import mongoose from 'mongoose'

const SeoSettingsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    keywords: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.SeoSettings ||
  mongoose.model('SeoSettings', SeoSettingsSchema)
