import { SettingsView } from '@components/common'
import { ClientOnly } from '@components/shared'
import { Wrapper } from '@components/ui'
import { ME } from '@graphql/queries'
import dynamic from 'next/dynamic'
import { apolloClient } from '@utils'
import { verify } from 'jsonwebtoken'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const Settings = ({ data }) => {
  return (
    <Wrapper>
      <Navbar />
      <ClientOnly>
        <SettingsView />
      </ClientOnly>
    </Wrapper>
  )
}

export async function getServerSideProps(context) {
  const token = context?.req?.headers?.cookie?.split('token=')[1]

  const { data } = await apolloClient.query({
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    query: ME,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  })

  if (!data) {
    return {
      redirect: {
        permanent: false,
        destination: '/giris',
      },
    }
  }

  try {
    const { id, isAdmin } = verify(token, process.env.JWT_SECRET)
    if (data._id !== id && !isAdmin) {
      return {
        redirect: {
          permanent: false,
          destination: '/giris',
        },
      }
    }
  } catch (e) {
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

export default Settings
