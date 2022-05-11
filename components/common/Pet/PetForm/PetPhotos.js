import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  decreaseFormStep,
  increaseFormStep,
  setData,
} from '@features/petPost/petPostSlice'
import { Button, ImageInput } from '@components/ui'

const PetPhotos = ({ photos, setPhotos }) => {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()
  const handleClick = async () => {
    setError(false)
    if (photos.length === 0) {
      setErrorMessage('En az 1 fotoğraf eklemelisiniz')
      setError(true)
      return
    }
    setPhotos(photos)
    dispatch(increaseFormStep())
  }

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl md:text-2xl font-bold'>Fotoğraf ekleyin</h2>
      <ImageInput
        setPlainContent={setPhotos}
        error={error}
        errorMessage={errorMessage}
      />
      <Button type='submit' onClick={handleClick} grow>
        Devam Et
      </Button>
      <Button
        type='button'
        variant='secondary'
        onClick={() => dispatch(decreaseFormStep())}
        grow
      >
        Geri
      </Button>
    </div>
  )
}

export default PetPhotos
