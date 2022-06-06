import { DefaultLayout, RegisterForm } from '@components/common'
import { ClientOnly } from '@components/shared'
import { Wrapper } from '@components/ui'
import { NextSeo } from 'next-seo'

const Register = () => {
  return (
    <Wrapper>
      <NextSeo title='Kaydol' />
      <ClientOnly>
        <RegisterForm />
      </ClientOnly>
    </Wrapper>
  )
}

Register.Layout = DefaultLayout
export default Register
