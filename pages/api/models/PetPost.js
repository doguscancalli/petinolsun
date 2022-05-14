import mongoose from 'mongoose'
import slug from 'mongoose-slug-updater'
import mongoosePaginate from 'mongoose-paginate-v2'

mongoose.plugin(slug)

const PetPostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      slug: 'name',
      slugPaddingSize: 4,
      unique: true,
    },
    postType: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    animal: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: Boolean,
      default: false,
    },
    listing: {
      type: Boolean,
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

PetPostSchema.plugin(mongoosePaginate)

export default mongoose.models.PetPost ||
  mongoose.model('PetPost', PetPostSchema)
