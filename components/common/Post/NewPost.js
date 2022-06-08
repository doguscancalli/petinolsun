import { useForm } from 'react-hook-form'
import { CREATE_POST } from '@graphql/mutations'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Input, Button } from '@components/ui'
import { addSearchData } from '@features/post/postSlice'

const NewPost = ({ setToggleModal }) => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [createPost, { data, loading }] = useMutation(CREATE_POST, {
    onError: (error) => {
      dispatch(
        sendToast({
          type: 'error',
          message: error.message,
        })
      )
    },
  })

  useEffect(() => {
    if (data) {
      router.push(`/gonderi/${data.createPost.slug}`)
      dispatch(
        sendToast({
          type: 'success',
          message: 'Gönderi başarıyla oluşturuldu, yönlendiriliyorsunuz',
        })
      )
      dispatch(addSearchData(data.createPost))
      reset()
      setToggleModal(false)
    }
  }, [data])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const validations = {
    title: {
      required: 'Başlık gerekli',
      maxLength: {
        value: 100,
        message: 'Başlık 100 karakterden fazla olamaz',
      },
    },
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

  const onSubmit = async (fields) => {
    createPost({
      variables: { input: fields },
    })
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-base md:text-xl font-bold'>Başlık</h2>
      <Input
        type='text'
        placeholder='Gönderi başlığı'
        error={errors?.title}
        errorMessage={errors?.title?.message}
        disabled={loading}
        {...register('title', { ...validations.title })}
      />
      <h2 className='text-base md:text-xl font-bold'>Açıklama</h2>
      <Input
        placeholder='Gönderi açıklaması'
        rows='6'
        textarea
        error={errors?.description}
        errorMessage={errors?.description?.message}
        disabled={loading}
        {...register('description', { ...validations.description })}
      />
      <Button loading={loading}>Paylaş</Button>
      <Button
        type='button'
        variant='secondary'
        disabled={loading}
        onClick={() => setToggleModal(false)}
      >
        İptal
      </Button>
    </form>
  )
}

export default NewPost
