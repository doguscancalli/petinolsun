import dynamic from 'next/dynamic'
import { PostEdit } from '@components/common'
import { Wrapper } from '@components/ui'
import { apolloClient } from '@utils'
import { verify } from 'jsonwebtoken'
import { ClientOnly } from '@components/shared'
import { GET_POST } from '@graphql/queries'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const EditPost = ({ data }) => {
  return (
    <Wrapper>
      <Navbar />
      <ClientOnly>
        <PostEdit data={data} />
      </ClientOnly>
    </Wrapper>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query
  const token = context?.req?.headers?.cookie?.split('token=')[1]

  const { data } = await apolloClient.query({
    context: { headers: { authorization: `Bearer ${token}` } },
    query: GET_POST,
    variables: {
      slug,
    },
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
  try {
    const { id, isAdmin } = verify(token, process.env.JWT_SECRET)
    if (data.post.user._id !== id && !isAdmin) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      }
    }
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }

  const { post } = data

  return {
    props: {
      data: post,
    },
  }
}

export default EditPost
