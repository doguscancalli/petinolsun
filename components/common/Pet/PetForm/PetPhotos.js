import { Button } from '@components/ui'
import ImageInput from './ImageInput'

const PetPhotos = ({ state, setState }) => {
  const handleClick = () => {
    setState({ ...state, petFormStep: state.petFormStep + 1 })
  }

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl md:text-2xl font-bold'>Fotoğraf ekleyin</h2>
      <ImageInput />
      <Button onClick={handleClick} grow>
        Devam Et
      </Button>
      <Button variant='secondary' grow>
        Geri
      </Button>
    </div>
  )
}

export default PetPhotos
