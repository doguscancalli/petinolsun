import { Wrapper } from '@components/ui'
import { ClientOnly } from '@components/shared'
import { DefaultLayout, LoginForm } from '@components/common'

const Login = () => {
  return (
    <Wrapper>
      <ClientOnly>
        <LoginForm />
      </ClientOnly>
    </Wrapper>
  )
}

Login.Layout = DefaultLayout
export default Login
