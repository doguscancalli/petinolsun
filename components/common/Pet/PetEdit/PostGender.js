import { Button, Select } from '@components/ui'
import { GENDER } from '@data/constants'
import { objectToArray } from '@utils'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { setEditData } from '@features/petPost/petPostSlice'
import { useMutation } from '@apollo/client'
import { UPDATE_PET_POST } from '@graphql/mutations'
import { useEffect } from 'react'

const PostGender = ({ id, data, setSelectedField }) => {
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

  const options = objectToArray(GENDER)

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-lg md:text-2xl font-bold'>Cinsiyet</h2>
      <Select
        options={options}
        defaultValue={data}
        disabled={loading}
        {...register('gender')}
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

export default PostGender
