import { Button, Select } from '@components/ui'

const PostPet = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('clicked')
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h2 className='text-lg md:text-2xl font-bold'>Hayvan</h2>
      <Select />
      <Button>Güncelle</Button>
      <Button variant='secondary'>İptal</Button>
    </form>
  )
}

export default PostPet
