import { useMutation } from '@apollo/client'
import { Button, Input } from '@components/ui'
import { addSearchData } from '@features/comment/commentSlice'
import { setSearchData } from '@features/post/postSlice'
import { sendToast } from '@features/ui/uiSlice'
import { CREATE_COMMENT } from '@graphql/mutations'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const NewComment = ({ setToggleModal, id }) => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const validations = {
    comment: {
      required: 'Bir yorum yazın',
      maxLength: {
        value: 300,
        message: 'Yorum 300 karakterden fazla olamaz',
      },
    },
  }

  const onSubmit = async (fields) => {
    createComment({
      variables: { input: { ...fields, post: id } },
    })
  }

  const [createComment, { data, loading }] = useMutation(CREATE_COMMENT, {
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
      dispatch(
        sendToast({
          type: 'success',
          message: 'Yorum başarıyla oluşturuldu',
        })
      )
      dispatch(addSearchData(data.createComment))
      reset()
      setToggleModal(false)
    }
  }, [data])

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-base md:text-xl font-bold'>Yorum</h2>
      <Input
        placeholder=''
        rows='6'
        textarea
        error={errors?.comment}
        errorMessage={errors?.comment?.message}
        disabled={loading}
        {...register('comment', { ...validations.comment })}
      />
      <Button loading={loading}>Paylaş</Button>
      <Button
        type='button'
        variant='secondary'
        onClick={() => setToggleModal(false)}
        disabled={loading}
      >
        İptal
      </Button>
    </form>
  )
}

export default NewComment
