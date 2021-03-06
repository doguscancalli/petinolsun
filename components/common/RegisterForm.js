import { useEffect } from 'react'
import Link from 'next/link'
import { Button, Input } from '@components/ui'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '@graphql/mutations'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { login } from 'features/auth/authSlice'
import { useRouter } from 'next/router'

const RegisterForm = () => {
  const dispatch = useDispatch()

  const router = useRouter()

  const [registerUser, { data, loading }] = useMutation(REGISTER_USER, {
    onError: (error) => {
      dispatch(
        sendToast({
          type: 'error',
          message: error.message,
        })
      )
    },
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
          message: 'Kayıt başarılı, yönlendiriliyorsunuz',
        })
      )
      reset()
      dispatch(login(data))
      router.push('/')
    }
  }, [data])

  const onSubmit = async (fields) => {
    await registerUser({ variables: { input: fields } })
  }

  const validations = {
    name: {
      required: 'İsim gerekli',
      maxLength: {
        value: 30,
        message: 'İsim 30 karakterden fazla olamaz',
      },
      pattern: {
        value: /[\p{L}-]+([^\s]+\s)+[^\s]+/gu,
        message: 'Ad soyad en az 1 kelime ve harflerden oluşmalıdır',
      },
    },
    email: {
      required: 'Eposta gerekli',
      pattern: {
        value:
          /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
        message: 'Geçerli bir eposta giriniz',
      },
    },
    password: {
      required: 'Şifre gerekli',
      minLength: {
        value: 8,
        message: 'Şifreniz en az 8 karakter olmalıdır',
      },
    },
  }

  return (
    <div className='bg-white max-w-lg w-full mx-auto mt-16 rounded-2xl px-5 md:px-16 py-8'>
      <h2 className='text-2xl md:text-4xl font-bold text-center'>
        Hesabını oluştur
      </h2>
      <form
        className='flex flex-col gap-4 mt-16'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='text-base md:text-xl font-bold'>İsim</h2>
        <Input
          placeholder='Ad Soyad'
          name='name'
          error={errors?.name}
          errorMessage={errors?.name?.message}
          disabled={loading}
          {...register('name', { ...validations.name })}
        />
        <h2 className='text-base md:text-xl font-bold'>Eposta</h2>
        <Input
          type='email'
          placeholder='mail@mail.com'
          error={errors?.email}
          errorMessage={errors?.email?.message}
          disabled={loading}
          {...register('email', { ...validations.email })}
        />
        <h2 className='text-base md:text-xl font-bold'>Şifre</h2>

        <Input
          placeholder='••••••••'
          type='password'
          error={errors?.password}
          errorMessage={errors?.password?.message}
          disabled={loading}
          {...register('password', { ...validations.password })}
        />
        <Button loading={loading}>Hesabını oluştur</Button>
      </form>
      <p className='mt-4 text-center'>
        Hesabın var mı?{' '}
        <Link href='/giris' passHref>
          <a className='underline'>Giriş yap</a>
        </Link>
      </p>
    </div>
  )
}

export default RegisterForm
