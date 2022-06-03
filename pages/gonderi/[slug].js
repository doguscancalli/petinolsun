import { Wrapper } from '@components/ui'
import { apolloClient } from '@utils'
import { DefaultLayout, PostView } from '@components/common'
import { GET_POST } from '@graphql/queries'

const PostSlug = ({ post }) => {
  return (
    <Wrapper>
      <PostView post={post} />
    </Wrapper>
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

PostSlug.Layout = DefaultLayout
export default PostSlug
