import { useMutation } from '@apollo/client'
import { Button, Checkbox, Input } from '@components/ui'
import { sendToast } from '@features/ui/uiSlice'
import { UPDATE_USER } from '@graphql/mutations'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const UpdateForm = ({ data, setToggleModal, refetch }) => {
  const { id, name, email, isAdmin } = data
  const dispatch = useDispatch()

  const [updateUser, { data: updateUserData, loading, error }] = useMutation(
    UPDATE_USER,
    {
      errorPolicy: 'all',
    }
  )

  useEffect(() => {
    if (updateUserData) {
      refetch()
      dispatch(
        sendToast({
          type: 'success',
          message: 'Kullanıcı başarıyla güncellendi',
        })
      )
      setToggleModal(false)
    }
  }, [updateUserData])

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const validations = {
    name: {
      required: 'İsim gerekli',
    },
    email: {
      required: 'Eposta gerekli',
    },
  }

  const onSubmit = async (fields) => {
    await updateUser({
      variables: {
        id,
        input: {
          ...(fields.email !== email && { email: fields.email }),
          ...(fields.name !== name && { name: fields.name }),
          ...(fields.isAdmin !== isAdmin && { isAdmin: !!fields.isAdmin }),
        },
      },
    })
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-base md:text-xl font-bold'>İsim</h2>
      <Input
        defaultValue={name}
        type='text'
        placeholder='Ad soyad'
        error={errors?.name}
        errorMessage={errors?.name?.message}
        disabled={loading}
        {...register('name', { ...validations.name })}
      />
      <h2 className='text-base md:text-xl font-bold'>Eposta</h2>
      <Input
        defaultValue={email}
        type='email'
        placeholder='mail@mail.com'
        error={errors?.email}
        errorMessage={errors?.email?.message}
        disabled={loading}
        {...register('email', { ...validations.email })}
      />
      <h2 className='text-base md:text-xl font-bold'>Admin</h2>
      <Checkbox
        defaultValue={isAdmin}
        defaultChecked={isAdmin}
        label='Admin yetkisi'
        htmlFor='isAdmin'
        disabled={loading}
        {...register('isAdmin')}
      />
      <Button loading={loading}>Güncelle</Button>
      <Button
        variant='secondary'
        type='button'
        disabled={loading}
        onClick={() => setToggleModal(false)}
      >
        İptal
      </Button>
    </form>
  )
}

export default UpdateForm
