import { useMutation } from '@apollo/client'
import { Button, Checkbox, Input } from '@components/ui'
import { sendToast } from '@features/ui/uiSlice'
import { UPDATE_USER } from '@graphql/mutations'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const UpdateForm = ({ data, setToggleModal, refetch }) => {
  const { id, name, email, isAdmin, isBanned } = data
  const dispatch = useDispatch()

  const [updateUser, { data: updateUserData, loading }] = useMutation(
    UPDATE_USER,
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
          ...(fields.isBanned !== isBanned && { isBanned: !!fields.isBanned }),
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
        placeholder='Ad Soyad'
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
      <Checkbox
        defaultValue={isBanned}
        defaultChecked={isBanned}
        label='Engellenmiş'
        htmlFor='isBanned'
        disabled={loading}
        {...register('isBanned')}
      />
      <Button loading={loading}>Güncelle</Button>
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

export default UpdateForm
