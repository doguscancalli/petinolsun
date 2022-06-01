import dynamic from 'next/dynamic'
import { Wrapper } from '@components/ui'
import { apolloClient } from '@utils'
import { PostView } from '@components/common'
import { GET_POST } from '@graphql/queries'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const PostSlug = ({ post }) => {
  return (
    <>
      <Wrapper>
        <Navbar />
        <PostView post={post} />
      </Wrapper>
    </>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.params

  const { data } = await apolloClient.query({
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

  return {
    props: {
      post: data.post,
    },
  }
}

export default PostSlug
