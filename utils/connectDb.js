import mongoose from 'mongoose'

export default async () => {
  if (mongoose.connections[0].readyState) return
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.log(err))
}
