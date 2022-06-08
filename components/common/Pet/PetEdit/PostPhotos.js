import { useState, useEffect } from 'react'
import { Button, ImageInput } from '@components/ui'
import { imageUpload } from '@utils'
import Image from 'next/image'
import { FiX } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { setEditData } from '@features/petPost/petPostSlice'
import { useMutation } from '@apollo/client'
import { UPDATE_PET_POST } from '@graphql/mutations'

const PostPhotos = ({ id, data, setSelectedField }) => {
  const [postPhotos, setPostPhotos] = useState(data)
  const [photos, setPhotos] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isImageUploading, setIsImageUploading] = useState(false)

  const dispatch = useDispatch()

  const [updateFields, { data: updatedData, loading }] = useMutation(
    UPDATE_PET_POST,
    {
      onError: (error) => {
        dispatch(
          sendToast({
            type: 'error',
            message: error.message,
          })
        )
      },
    }
  )

  useEffect(() => {
    if (updatedData) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'İlan güncellendi',
        })
      )
      dispatch(setEditData({ photos: postPhotos }))
      setSelectedField('')
    }
  }, [updatedData])

  const handleRemove = (image) => {
    var result = confirm('Fotoğrafı silmek istediğinize emin misiniz?')
    if (result) {
      const newPhotos = postPhotos.filter((item) => item !== image)
      setPostPhotos(newPhotos)
    }
    return
  }

  const handleClick = async () => {
    setError(false)
    if (photos.length === 0) {
      setErrorMessage('En az 1 fotoğraf eklemelisiniz')
      setError(true)
      return
    }
    setIsImageUploading(true)
    const urls = await imageUpload(photos)
    setIsImageUploading(false)
    postPhotos.push(...urls)
    dispatch(setEditData({ photos: postPhotos }))
    await updateFields({
      variables: {
        id,
        input: {
          photos: postPhotos,
        },
      },
    })
  }

  const handlePhotoLimit = () => {
    const maxPhotoLimit = 5
    return maxPhotoLimit - postPhotos.length
  }

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-lg md:text-2xl font-bold'>Fotoğraflar</h2>
      <ImageInput
        setPlainContent={setPhotos}
        error={error}
        maxFile={handlePhotoLimit()}
        disabled={handlePhotoLimit() === 0 || isImageUploading || loading}
        errorMessage={errorMessage}
      />
      <h2 className='text-lg md:text-2xl font-bold'>İlan fotoğrafları</h2>
      <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2'>
        {postPhotos?.map((item) => (
          <li
            className='relative'
            style={{
              aspectRatio: '1 / 1.2',
            }}
            key={item}
          >
            <button
              className='bg-black text-white absolute -top-1 -right-1 z-10 rounded-full p-2'
              onClick={() => handleRemove(item)}
            >
              <FiX />
            </button>
            <Image
              className='rounded-lg'
              src={item}
              alt=''
              layout='fill'
              objectFit='cover'
            />
          </li>
        ))}
      </ul>
      <Button
        type='submit'
        onClick={handleClick}
        loading={loading || isImageUploading}
        grow
      >
        Güncelle
      </Button>
      <Button
        type='button'
        variant='secondary'
        disabled={loading || isImageUploading}
        onClick={() => setSelectedField('')}
      >
        İptal
      </Button>
    </div>
  )
}

export default PostPhotos
