import { DefaultLayout, SettingsView } from '@components/common'
import { ClientOnly } from '@components/shared'
import { Wrapper } from '@components/ui'
import { getServerCookie } from '@utils'
import { ME } from '@graphql/queries'
import { apolloClient } from '@utils'
import { verify } from 'jsonwebtoken'
import { NextSeo } from 'next-seo'

const Settings = () => {
  return (
    <Wrapper>
      <NextSeo title='Ayarlar' />
      <ClientOnly>
        <SettingsView />
      </ClientOnly>
    </Wrapper>
  )
}

export async function getServerSideProps(context) {
  const token = getServerCookie(context, 'token')

  const { data } = await apolloClient.query({
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    query: ME,
    fetchPolicy: 'no-cache',
    onError: (error) => {
      console.log(error)
    },
  })

  if (!data?.me) {
    return {
      redirect: {
        permanent: false,
        destination: '/giris',
      },
    }
  }

  try {
    const { id, isAdmin } = verify(token, process.env.JWT_SECRET)
    if (data.me.id !== id && !isAdmin) {
      return {
        redirect: {
          permanent: false,
          destination: '/giris',
        },
      }
    }
  } catch (err) {
    console.log(err)
    return {
      redirect: {
        permanent: false,
        destination: '/giris',
      },
    }
  }

  const { me } = data

  return {
    props: {
      data: me,
    },
  }
}

Settings.Layout = DefaultLayout
export default Settings
