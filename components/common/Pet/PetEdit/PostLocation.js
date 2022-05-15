import { Button, Input } from '@components/ui'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_PET_POST } from '@graphql/mutations'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { setEditData } from '@features/petPost/petPostSlice'
import { useEffect } from 'react'

const PostLocation = ({ id, data, setSelectedField }) => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()

  const [updateFields, { data: updatedData, loading, error }] = useMutation(
    UPDATE_PET_POST,
    {
      errorPolicy: 'all',
    }
  )

  const validations = {
    location: {
      required: 'Lokasyon gerekli',
      maxLength: {
        value: 30,
        message: 'Lokasyon 30 karakterden fazla olamaz',
      },
    },
  }

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

  useEffect(() => {
    if (updatedData) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'İlan güncellendi',
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
      <h2 className='text-lg md:text-2xl font-bold'>Lokasyon</h2>
      <Input
        placeholder='Şehir, ilçe/semt'
        defaultValue={data}
        error={errors?.location}
        errorMessage={errors?.location?.message}
        {...register('location', { ...validations.location })}
      />
      <Button loading={loading}>Güncelle</Button>
      <Button
        variant='secondary'
        disabled={loading}
        onClick={() => setSelectedField('')}
      >
        İptal
      </Button>
    </form>
  )
}

export default PostLocation
