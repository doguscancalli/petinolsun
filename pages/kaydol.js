import { RegisterForm } from '@components/common'
import { ClientOnly, Navbar } from '@components/shared'
import { Wrapper } from '@components/ui'

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
