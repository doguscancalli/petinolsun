import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { UPDATE_USER } from '@graphql/mutations'
import { Button, Input } from '@components/ui'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { setUser } from '@features/auth/authSlice'
import { sendToast } from '@features/ui/uiSlice'
import { setCookies } from 'cookies-next'
import jwtDecode from 'jwt-decode'

const UserEmail = ({ id, data, setSelectedField }) => {
  const dispatch = useDispatch()

  const [updateFields, { data: updatedData, loading, error }] = useMutation(
    UPDATE_USER,
    {
      errorPolicy: 'all',
    }
  )

  const validations = {
    email: {
      required: 'Eposta gerekli',
      pattern: {
        value:
          /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
        message: 'Geçerli bir eposta giriniz',
      },
    },
  }

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

  useEffect(() => {
    if (updatedData) {
      const {
        updateUser: { email },
      } = updatedData
      const decodedToken = jwtDecode(updatedData.updateUser.token)
      setCookies('token', updatedData.updateUser.token, {
        expires: new Date(decodedToken.exp * 1000),
        secure: process.env.NODE_ENV === 'production',
      })
      dispatch(setUser({ email }))
      dispatch(
        sendToast({
          type: 'success',
          message: 'Kullanıcı bilgileri güncellendi',
        })
      )
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
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-lg md:text-2xl font-bold'>Eposta</h2>
      <Input
        placeholder='mail@mail.com'
        defaultValue={data}
        error={errors?.email}
        errorMessage={errors?.email?.message}
        {...register('email', { ...validations.email })}
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

export default UserEmail
