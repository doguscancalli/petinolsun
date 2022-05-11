import { useEffect } from 'react'
import Link from 'next/link'
import { Button, Checkbox, Input } from '@components/ui'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '@graphql/mutations'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { login } from 'features/auth/authSlice'
import { useRouter } from 'next/router'

const LoginForm = () => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    errorPolicy: 'all',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    if (data) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'Giriş başarılı, yönlendiriliyorsunuz',
        })
      )
      reset()
      dispatch(login(data))
      router.push('/')
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

  const validations = {
    email: {
      required: 'Eposta gerekli',
    },
    password: {
      required: 'Şifre gerekli',
    },
  }

  const onSubmit = async (fields) => {
    await loginUser({ variables: { input: fields } })
  }

  return (
    <div className='bg-white max-w-lg w-full mx-auto mt-16 rounded-2xl px-5 md:px-16 py-8'>
      <h2 className='text-2xl md:text-4xl font-bold text-center'>Oturum aç</h2>
      <form
        className='flex flex-col gap-4 mt-16'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='text-base md:text-xl font-bold'>Eposta</h2>
        <Input
          type='email'
          placeholder='eposta@gmail.com'
          error={errors?.email || error}
          errorMessage={errors?.email?.message}
          disabled={loading}
          {...register('email', { ...validations.email })}
        />
        <h2 className='text-base md:text-xl font-bold'>Şifre</h2>
        <Input
          placeholder='••••••••'
          type='password'
          error={errors?.password || error}
          errorMessage={errors?.password?.message}
          disabled={loading}
          {...register('password', { ...validations.password })}
        />
        <Link href='/sifremi-unuttum' passHref>
          <a className='underline'>Şifremi unuttum</a>
        </Link>
        <Button loading={loading}>Oturum aç</Button>
      </form>
      <p className='mt-4 text-center'>
        Hesabın yok mu?{' '}
        <Link href='/kaydol' passHref>
          <a className='underline'>Kaydol</a>
        </Link>
      </p>
    </div>
  )
}

export default LoginForm
