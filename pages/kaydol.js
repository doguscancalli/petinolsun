import dynamic from 'next/dynamic'
import { RegisterForm } from '@components/common'
import { ClientOnly } from '@components/shared'
import { Wrapper } from '@components/ui'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const Register = () => {
  return (
    <Wrapper>
      <Navbar />
      <ClientOnly>
        <RegisterForm />
      </ClientOnly>
    </Wrapper>
  )
}

export default Register
