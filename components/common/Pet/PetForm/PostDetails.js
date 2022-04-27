import { Button, Input } from '@components/ui'

const PostDetails = ({ state, setState }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    setState({ ...state, petFormStep: state.petFormStep + 1 })
  }

  return (
    <>
      <form className='mt-4 flex flex-col gap-4' onSubmit={handleSubmit}>
        <h2 className='text-xl md:text-2xl font-bold'>
          İlan hakkında daha bilgi verin
        </h2>
        <Input placeholder='İlan açıklaması' rows='6' textarea />
        <div className='flex flex-col gap-2'>
          <Button grow>Devam Et</Button>
          <Button variant='secondary' grow>
            Geri
          </Button>
        </div>
      </form>
    </>
  )
}

export default PostDetails
