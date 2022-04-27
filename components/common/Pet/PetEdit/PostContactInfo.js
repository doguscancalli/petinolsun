import { Button, Input } from '@components/ui'

const PostContactInfo = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('clicked')
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h2 className='text-lg md:text-2xl font-bold'>İletişim</h2>
      <Input />
      <Button>Güncelle</Button>
      <Button variant='secondary'>İptal</Button>
    </form>
  )
}

export default PostContactInfo
