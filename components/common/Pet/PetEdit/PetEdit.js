import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import fields from '@data/petPostEditFields'
import PulseLoader from 'react-spinners/PulseLoader'
import { Button, Modal } from '@components/ui'
import { POST_TYPE } from '@data/constants'
import { setEditData } from '@features/petPost/petPostSlice'
import { isObjectEmpty } from '@utils'
import { DELETE_PET_POST } from '@graphql/mutations'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { sendToast } from '@features/ui/uiSlice'

const PetEdit = ({ data }) => {
  const { id, name, postType } = data

  const { editData } = useSelector((state) => state.petPost)
  const dispatch = useDispatch()

  const router = useRouter()

  const [deletePetPost, { data: deletedData, loading, error }] = useMutation(
    DELETE_PET_POST,
    {
      errorPolicy: 'all',
    }
  )

  useEffect(() => {
    dispatch(setEditData(data))
  }, [])

  const [selectedField, setSelectedField] = useState('')

  const Component = selectedField.component

  const handleClick = (name) => {
    const filteredField = fields.find((field) => field.name === name)
    setSelectedField(filteredField)
  }

  const handleComponentData = () => {
    if (selectedField.valueType === 'multiContent') {
      return selectedField.value.split(',').map((value) => editData[value])
    }
    return editData[selectedField.value]
  }

  const handleDelete = () => {
    var result = confirm('İlanı silmek istediğinize emin misiniz?')
    if (result) {
      deletePetPost({
        variables: {
          id,
        },
      })
    }
  }

  useEffect(() => {
    if (deletedData) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'İlan silindi, yönlendiriliyorsunuz',
        })
      )
      router.push('/')
    }
  }, [deletedData])

  useEffect(() => {
    if (error) {
      console.log(error)
      error.graphQLErrors.forEach((error) =>
        dispatch(
          sendToast({
            type: 'error',
            message: error?.extensions?.originalError?.message,
          })
        )
      )
    }
  }, [error])

  if (isObjectEmpty(editData)) return <PulseLoader size={8} />

  return (
    <div className='max-w-lg mx-auto mt-16'>
      {selectedField && (
        <Modal>
          <Component
            id={id}
            data={handleComponentData()}
            setSelectedField={setSelectedField}
          />
        </Modal>
      )}
      <Button className='mb-4 inline-flex' href={`/ilan/${editData?.slug}`}>
        İlana geri dön
      </Button>
      <h1 className='text-2xl md:text-3xl font-bold mb-8'>
        {name} adlı {POST_TYPE[postType].toLowerCase()} ilanınızı düzenleyin
      </h1>
      <ul className='flex flex-col gap-6'>
        {fields.map(({ name, valueType, value, constant }) => (
          <li key={name}>
            <div className='flex justify-between mb-4'>
              <h3 className='text-lg md:text-2xl font-bold'>{name}</h3>
              <Button size='small' onClick={() => handleClick(name)}>
                Değiştir
              </Button>
            </div>
            {valueType === 'constant' && (
              <p className='text-black-500'>{constant[editData[value]]}</p>
            )}
            {valueType === 'content' && (
              <p className='text-black-500'>{editData[value]}</p>
            )}
            {valueType === 'multiContent' && (
              <p className='text-black-500'>
                {value
                  .split(',')
                  .map((field) => editData[field])
                  .join(', ')}
              </p>
            )}
            {valueType === 'photo' && (
              <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2'>
                {editData[value]?.map((item) => (
                  <li
                    className='relative'
                    style={{
                      aspectRatio: '1 / 1.2',
                    }}
                    key={item}
                  >
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
            )}
          </li>
        ))}
      </ul>
      <button
        className='text-red mt-6 cursor-pointer'
        onClick={handleDelete}
        disabled={loading}
      >
        İlanı sil
      </button>
    </div>
  )
}

export default PetEdit
