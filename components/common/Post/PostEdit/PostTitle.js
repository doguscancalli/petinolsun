import { Button, Input } from '@components/ui'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_POST } from '@graphql/mutations'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { setEditData } from '@features/post/postSlice'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const PostTitle = ({ id, data, setSelectedField }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()

  const [updateFields, { data: updatedData, loading }] = useMutation(
    UPDATE_POST,
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
    title: {
      required: 'Başlık gerekli',
      maxLength: {
        value: 100,
        message: 'Başlık 100 karakterden fazla olamaz',
      },
    },
  }

  useEffect(() => {
    if (updatedData) {
      const {
        updatePost: { slug },
      } = updatedData
      dispatch(setEditData({ slug }))
      router.replace(`/gonderi/duzenle/${slug}`)
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

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-lg md:text-2xl font-bold'>Başlık</h2>
      <Input
        placeholder='Başlık'
        defaultValue={data}
        error={errors?.title}
        errorMessage={errors?.title?.message}
        {...register('title', { ...validations.title })}
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

export default PostTitle
