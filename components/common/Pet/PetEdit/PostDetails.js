import { Button, Input } from '@components/ui'

const PostDetails = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('clicked')
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h2 className='text-lg md:text-2xl font-bold'>Detaylar</h2>
      <Input textarea rows={6} />
      <Button>Güncelle</Button>
      <Button variant='secondary'>İptal</Button>
    </form>
  )
}

export default PostDetails
