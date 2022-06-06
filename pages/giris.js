import { Wrapper } from '@components/ui'
import { ClientOnly } from '@components/shared'
import { DefaultLayout, LoginForm } from '@components/common'
import { NextSeo } from 'next-seo'

const Login = () => {
  return (
    <Wrapper>
      <NextSeo title='Giriş' />
      <ClientOnly>
        <LoginForm />
      </ClientOnly>
    </Wrapper>
  )
}

Login.Layout = DefaultLayout
export default Login
