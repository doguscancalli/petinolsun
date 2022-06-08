import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { UPDATE_PASSWORD } from '@graphql/mutations'
import { Button, Input } from '@components/ui'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { sendToast } from '@features/ui/uiSlice'

const UserPassword = ({ id, data, setSelectedField }) => {
  const dispatch = useDispatch()

  const [updateFields, { data: updatedData, loading }] = useMutation(
    UPDATE_PASSWORD,
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

  const validations = {
    password: {
      required: 'Şifre gerekli',
      // minLength: {
      //   value: 8,
      //   message: 'Şifreniz en az 8 karakter olmalıdır',
      // },
    },
    newPassword: {
      required: 'Yeni şifre gerekli',
      minLength: {
        value: 8,
        message: 'Yeni şifreniz en az 8 karakter olmalıdır',
      },
    },
  }

  const onSubmit = async (fields) => {
    await updateFields({
      variables: {
        ...fields,
      },
    })
  }

  useEffect(() => {
    if (updatedData) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'Kullanıcı bilgileri güncellendi',
        })
      )
      setSelectedField('')
    }
  }, [updatedData])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-lg md:text-2xl font-bold'>Şifre</h2>
      <Input
        type='password'
        placeholder='••••••••'
        defaultValue={''}
        error={errors?.password}
        errorMessage={errors?.password?.message}
        {...register('password', { ...validations.password })}
      />
      <h2 className='text-lg md:text-2xl font-bold'>Yeni Şifre</h2>
      <Input
        type='password'
        placeholder='••••••••'
        defaultValue={''}
        error={errors?.newPassword}
        errorMessage={errors?.newPassword?.message}
        {...register('newPassword', { ...validations.newPassword })}
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

export default UserPassword
