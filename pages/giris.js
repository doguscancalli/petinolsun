import dynamic from 'next/dynamic'
import { Wrapper } from '@components/ui'
import { ClientOnly } from '@components/shared'
import { LoginForm } from '@components/common'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

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
