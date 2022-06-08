import { Button, Input } from '@components/ui'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_PET_POST } from '@graphql/mutations'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { setEditData } from '@features/petPost/petPostSlice'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const PostName = ({ id, data, setSelectedField }) => {
  const router = useRouter()
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
    name: {
      required: `İsim/Başlık gerekli`,
      maxLength: {
        value: 50,
        message: `İsim/Başlık 50 karakterden fazla olamaz`,
      },
    },
  }

  useEffect(() => {
    if (updatedData) {
      const {
        updatePetPost: { slug },
      } = updatedData
      dispatch(setEditData({ slug }))
      router.replace(`/ilan/duzenle/${slug}`)
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

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-lg md:text-2xl font-bold'>İsim/Başlık</h2>
      <Input
        placeholder='Tardis'
        defaultValue={data}
        error={errors?.name}
        errorMessage={errors?.name?.message}
        {...register('name', { ...validations.name })}
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

export default PostName
