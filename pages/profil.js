import { ProfileView } from '@components/common'
import { ClientOnly } from '@components/shared'
import { Wrapper } from '@components/ui'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const Profile = () => {
  return (
    <Wrapper>
      <Navbar />
      <ClientOnly>
        <ProfileView />
      </ClientOnly>
    </Wrapper>
  )
}

export default Profile
