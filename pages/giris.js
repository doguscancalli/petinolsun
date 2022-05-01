import { Navbar } from '@components/shared'
import { Wrapper } from '@components/ui'
import { ClientOnly } from '@components/shared'
import { LoginForm } from '@components/common'

const Login = () => {
  return (
    <Wrapper>
      <Navbar />
      <ClientOnly>
        <LoginForm />
      </ClientOnly>
    </Wrapper>
  )
}

export default Login
