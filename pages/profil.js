import { DefaultLayout, ProfileView } from '@components/common'
import { ClientOnly } from '@components/shared'
import { Wrapper } from '@components/ui'

const Profile = () => {
  return (
    <Wrapper>
      <ClientOnly>
        <ProfileView />
      </ClientOnly>
    </Wrapper>
  )
}

Profile.Layout = DefaultLayout
export default Profile
