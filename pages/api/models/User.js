import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, default: false, required: true },
    isBanned: { type: Boolean, default: false, required: true },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
)

// Cascade delete pet posts, posts and comments when a user is deleted
UserSchema.pre('remove', async function (next) {
  await this.model('PetPost').deleteMany({ user: this._id })
  await this.model('Post').deleteMany({ user: this._id })
  await this.model('Comment').deleteMany({ user: this._id })
  next()
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
