import { DefaultLayout, RegisterForm } from '@components/common'
import { ClientOnly } from '@components/shared'
import { Wrapper } from '@components/ui'

const Register = () => {
  return (
    <Wrapper>
      <ClientOnly>
        <RegisterForm />
      </ClientOnly>
    </Wrapper>
  )
}

Register.Layout = DefaultLayout
export default Register
