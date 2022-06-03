import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button, Input, Wrapper } from '@components/ui'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { RESET_PASSWORD } from '@graphql/mutations'
import { DefaultLayout } from '@components/common'

const ResetPassword = () => {
  const router = useRouter()
  const { token } = router.query

  const dispatch = useDispatch()

  const [resetPassword, { data, loading, error }] = useMutation(
    RESET_PASSWORD,
    {
      errorPolicy: 'all',
    }
  )

  useEffect(() => {
    if (data) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'Şifreniz başarıyla sıfırlandı, yönlendiriliyorsunuz',
        })
      )
      router.push('/giris')
      reset()
    }
  }, [data])

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
    reset,
  } = useForm()

  const validations = {
    password: {
      required: 'Şifre gerekli',
      minLength: {
        value: 8,
        message: 'Şifreniz en az 8 karakter olmalıdır',
      },
    },
  }

  const onSubmit = async ({ password }) => {
    await resetPassword({ variables: { resetToken: token, password } })
  }

  return (
    <Wrapper>
      <div className='bg-white max-w-lg w-full mx-auto mt-16 rounded-2xl px-5 md:px-16 py-8'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          Yeni şifreni gir
        </h2>
        <form
          className='flex flex-col gap-4 mt-16'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className='text-base md:text-xl font-bold'>Şifre</h2>
          <Input
            placeholder='••••••••'
            type='password'
            error={errors?.password || error}
            errorMessage={errors?.password?.message}
            disabled={loading}
            {...register('password', { ...validations.password })}
          />
          <Button loading={loading}>Değiştir</Button>
        </form>
        <p className='mt-4 text-center'>
          <Link href='/giris' passHref>
            <a className='underline'>Giriş ekranına dön</a>
          </Link>
        </p>
      </div>
    </Wrapper>
  )
}

ResetPassword.Layout = DefaultLayout
export default ResetPassword
