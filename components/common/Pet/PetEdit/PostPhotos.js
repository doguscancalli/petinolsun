import { Button, ImageInput } from '@components/ui'

const PostPhotos = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-lg md:text-2xl font-bold'>Fotoğraflar</h2>
      <ImageInput />
      <Button>Güncelle</Button>
      <Button variant='secondary'>İptal</Button>
    </div>
  )
}

export default PostPhotos
