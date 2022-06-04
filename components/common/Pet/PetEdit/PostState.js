import { useEffect } from 'react'
import { Button, Select } from '@components/ui'
import { PET_POST_STATE } from '@data/constants'
import { objectToArray } from '@utils'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_PET_POST } from '@graphql/mutations'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { setEditData } from '@features/petPost/petPostSlice'

const PostState = ({ id, data, setSelectedField }) => {
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
      const { listing } = getValues()
      dispatch(setEditData({ listing: listing === 'true' }))
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

  const onSubmit = async ({ listing }) => {
    await updateFields({
      variables: {
        id,
        input: {
          listing: listing === 'true',
        },
      },
    })
  }

  const options = objectToArray(PET_POST_STATE)

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-lg md:text-2xl font-bold'>İlan durumu</h2>
      <Select
        options={options}
        defaultValue={data}
        disabled={loading}
        {...register('listing')}
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

export default PostState
