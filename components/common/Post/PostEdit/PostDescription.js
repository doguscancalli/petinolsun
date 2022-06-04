import { Button, Input } from '@components/ui'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_POST } from '@graphql/mutations'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { setEditData } from '@features/post/postSlice'
import { useEffect } from 'react'

const PostDescription = ({ id, data, setSelectedField }) => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()

  const [updateFields, { data: updatedData, loading, error }] = useMutation(
    UPDATE_POST,
    {
      errorPolicy: 'all',
    }
  )

  const onSubmit = async (fields) => {
    await updateFields({
      variables: {
        id,
        input: {
          ...fields,
        },
      },
    })
  }

  const validations = {
    description: {
      required: 'Açıklama gerekli',
      minLength: {
        value: 20,
        message: 'Açıklama en az 20 karakterden oluşmalıdır',
      },
      maxLength: {
        value: 500,
        message: 'Açıklama 500 karakterden fazla olamaz',
      },
    },
  }

  useEffect(() => {
    if (updatedData) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'Gönderi güncellendi',
        })
      )
      dispatch(setEditData(getValues()))
      setSelectedField('')
    }
  }, [updatedData])

  useEffect(() => {
    if (error) {
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

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-lg md:text-2xl font-bold'>Açıklama</h2>
      <Input
        placeholder='Açıklama'
        defaultValue={data}
        error={errors?.description}
        errorMessage={errors?.description?.message}
        {...register('description', { ...validations.description })}
      />
      <Button loading={loading}>Güncelle</Button>
      <Button
        type='button'
        variant='secondary'
        disabled={loading}
        onClick={() => setSelectedField('')}
      >
        İptal
      </Button>
    </form>
  )
}

export default PostDescription
