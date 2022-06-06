import { DefaultLayout, ProfileView } from '@components/common'
import { ClientOnly } from '@components/shared'
import { Wrapper } from '@components/ui'
import { NextSeo } from 'next-seo'

const Profile = () => {
  return (
    <Wrapper>
      <NextSeo title='Profil' />
      <ClientOnly>
        <ProfileView />
      </ClientOnly>
    </Wrapper>
  )
}

Profile.Layout = DefaultLayout
export default Profile
