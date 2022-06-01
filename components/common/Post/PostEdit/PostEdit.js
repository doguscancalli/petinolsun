import { useMutation } from '@apollo/client'
import { Button, Modal } from '@components/ui'
import fields from '@data/postEditFields'
import { setEditData } from '@features/post/postSlice'
import { sendToast } from '@features/ui/uiSlice'
import { DELETE_POST } from '@graphql/mutations'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PostEdit = ({ data }) => {
  const { id } = data

  const [selectedField, setSelectedField] = useState('')

  const { editData } = useSelector((state) => state.post)
  const dispatch = useDispatch()

  const [deletePost, { data: deletedData, loading, error }] = useMutation(
    DELETE_POST,
    {
      errorPolicy: 'all',
    }
  )

  useEffect(() => {
    if (deletedData) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'Gönderi başarıyla silindi, yönlendiriliyorsunuz',
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

  useEffect(() => {
    dispatch(setEditData(data))
  }, [])

  const Component = selectedField.component

  const handleClick = (name) => {
    const filteredField = fields.find((field) => field.name === name)
    setSelectedField(filteredField)
  }

  const handleDelete = () => {
    var result = confirm('Gönderiyi silmek istediğinize emin misiniz?')
    if (result) {
      deletePost({
        variables: {
          id,
        },
      })
    }
  }

  return (
    <div className='max-w-lg mx-auto mt-16'>
      {selectedField && (
        <Modal>
          <Component
            id={id}
            data={editData[selectedField.value]}
            setSelectedField={setSelectedField}
          />
        </Modal>
      )}
      <Button className='mb-4 inline-flex' href={`/gonderi/${editData?.slug}`}>
        Gönderiye geri dön
      </Button>
      <h1 className='text-2xl md:text-3xl font-bold mb-8'>
        Gönderinizi düzenleyin
      </h1>
      <ul className='flex flex-col gap-6'>
        {fields.map(({ name, valueType, value }) => (
          <li key={name}>
            <div className='flex justify-between mb-4'>
              <h3 className='text-lg md:text-2xl font-bold'>{name}</h3>
              <Button size='small' onClick={() => handleClick(name)}>
                Değiştir
              </Button>
            </div>
            {valueType === 'content' && (
              <p className='text-black-500 break-words'>{editData[value]}</p>
            )}
          </li>
        ))}
      </ul>
      <button
        className='text-red mt-6 cursor-pointer'
        onClick={handleDelete}
        disabled={loading}
      >
        Gönderiyi sil
      </button>
    </div>
  )
}

export default PostEdit
