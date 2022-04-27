import { Button } from '@components/ui'

const PetPhotos = ({ state, setState }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    setState({ ...state, petFormStep: state.petFormStep + 1 })
  }

  return (
    <>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <h2 className='text-xl md:text-2xl font-bold'>Fotoğraf ekleyin</h2>
        <Button grow>Devam Et</Button>
        <Button variant='secondary' grow>
          Geri
        </Button>
      </form>
    </>
  )
}

export default PetPhotos
