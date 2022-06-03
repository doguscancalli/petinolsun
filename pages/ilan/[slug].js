import { DefaultLayout, PetView } from '@components/common'
import { Wrapper } from '@components/ui'
import { apolloClient } from '@utils'
import { GET_PET_POST } from '@graphql/queries'

const PetSlug = ({ petPost }) => {
  return (
    <Wrapper>
      <PetView post={petPost} />
    </Wrapper>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.params

  const { data } = await apolloClient.query({
    query: GET_PET_POST,
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
      petPost: data.petPost,
    },
  }
}

PetSlug.Layout = DefaultLayout
export default PetSlug
