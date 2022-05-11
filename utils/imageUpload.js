import axios from 'axios'

export default async (images, preset) => {
  const imageUrls = []
  preset = process.env.NEXT_PUBLIC_CLOUDINARY_PET_POST_UPLOAD_PRESET || preset

  for (const image of images) {
    const data = new FormData()
    data.append('file', image)
    data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
    data.append('upload_preset', preset)

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      data
    )

    imageUrls.push(res.data.secure_url)
  }

  return imageUrls
}
