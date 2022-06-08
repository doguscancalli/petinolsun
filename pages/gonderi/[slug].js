import { Wrapper } from '@components/ui'
import { apolloClient } from '@utils'
import { DefaultLayout, PostView } from '@components/common'
import { GET_POST } from '@graphql/queries'
import { NextSeo } from 'next-seo'

const PostSlug = ({ post }) => {
  const { title, description } = post

  return (
    <Wrapper>
      <NextSeo title={title} description={`${description.slice(0, 157)}...`} />
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
    fetchPolicy: 'no-cache',
    onError: (error) => {
      console.log(error)
    },
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
