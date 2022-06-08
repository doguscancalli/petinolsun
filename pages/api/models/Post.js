import mongoose from 'mongoose'
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug)

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      slug: 'title',
      slugPaddingSize: 4,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Cascade delete comments and reports when a post is deleted
PostSchema.pre('remove', async function (next) {
  await this.model('Comment').deleteMany({ post: this._id })
  await this.model('Report').deleteMany({ reportedTopicId: this._id })
  next()
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema)
