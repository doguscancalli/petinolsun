import Link from 'next/link'
import { Button, Input, Wrapper } from '@components/ui'
import { useForm } from 'react-hook-form'
import { FORGOT_PASSWORD } from '@graphql/mutations'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { DefaultLayout } from '@components/common'
import { NextSeo } from 'next-seo'

const LostPassword = () => {
  const dispatch = useDispatch()

  const [forgotPassword, { data, loading, error }] = useMutation(
    FORGOT_PASSWORD,
    {
      errorPolicy: 'all',
    }
  )

  useEffect(() => {
    if (data) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'Şifre sıfırlama bağlantınız e-posta adresinize gönderildi',
        })
      )
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
    email: {
      required: 'Eposta gerekli',
      pattern: {
        value:
          /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
        message: 'Geçerli bir eposta giriniz',
      },
    },
  }

  const onSubmit = async ({ email }) => {
    await forgotPassword({ variables: { resetEmail: email } })
  }

  return (
    <Wrapper>
      <NextSeo title='Şifremi Unuttum' />
      <div className='bg-white max-w-lg w-full mx-auto mt-16 rounded-2xl px-5 md:px-16 py-8'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          Şifreni sıfırla
        </h2>
        <form
          className='flex flex-col gap-4 mt-16'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className='text-base md:text-xl font-bold'>Eposta</h2>
          <Input
            type='email'
            placeholder='mail@mail.com'
            error={errors?.email || error}
            errorMessage={errors?.email?.message}
            disabled={loading}
            {...register('email', { ...validations.email })}
          />
          <Button loading={loading}>Sıfırla</Button>
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

LostPassword.Layout = DefaultLayout
export default LostPassword
