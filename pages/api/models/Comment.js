import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Comment ||
  mongoose.model('Comment', CommentSchema)
