import { connectDb } from '@utils'

import { petPosts } from '@data/mock'

import PetPost from './models/PetPost'

export default async function handler(req, res) {
  if (process.env.NODE_ENV === 'production') return res.status(401)

  await connectDb()

  await PetPost.deleteMany({})
  await PetPost.create(petPosts)

  res.status(200).json({
    status: 'success',
  })
}
