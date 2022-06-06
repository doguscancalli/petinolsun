import { AdminLayout, SeoSettings } from '@components/common'
import { ClientOnly } from '@components/shared'
import { GET_SEO_SETTINGS } from '@graphql/queries'
import { apolloClient } from '@utils'

const AdminSettings = ({ data }) => {
  return (
    <ClientOnly>
      <SeoSettings data={data} />
    </ClientOnly>
  )
}

export async function getServerSideProps(context) {
  const token = context?.req?.headers?.cookie?.split('token=')[1]

  const { data } = await apolloClient.query({
    context: { headers: { authorization: `Bearer ${token}` } },
    query: GET_SEO_SETTINGS,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  })

  if (!data) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }

  const { seoSettings } = data

  return {
    props: {
      data: seoSettings,
    },
  }
}

AdminSettings.Layout = AdminLayout
export default AdminSettings
