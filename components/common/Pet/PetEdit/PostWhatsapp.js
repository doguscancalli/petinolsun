import { useEffect } from 'react'
import { Button, Checkbox } from '@components/ui'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_PET_POST } from '@graphql/mutations'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { setEditData } from '@features/petPost/petPostSlice'

const PostWhatsapp = ({ id, data, setSelectedField }) => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()

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
      const { whatsapp } = getValues()
      dispatch(setEditData({ whatsapp: !!whatsapp }))
      setSelectedField('')
    }
  }, [updatedData])

  const onSubmit = async ({ whatsapp }) => {
    await updateFields({
      variables: {
        id,
        input: {
          whatsapp: !!whatsapp,
        },
      },
    })
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-lg md:text-2xl font-bold'>Whatsapp</h2>
      <Checkbox
        defaultValue={data}
        defaultChecked={data}
        label='Whatsapp üzerinden mesaj atabilirler'
        htmlFor='whatsapp'
        disabled={loading}
        {...register('whatsapp')}
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

export default PostWhatsapp
