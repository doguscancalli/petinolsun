import dynamic from 'next/dynamic'
import { PetView } from '@components/common'
import { Wrapper } from '@components/ui'
import { apolloClient } from '@utils'
import { GET_PET_POST } from '@graphql/queries'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const PetSlug = ({ petPost }) => {
  return (
    <>
      <Wrapper>
        <Navbar />
        <PetView post={petPost} />
      </Wrapper>
    </>
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

export default PetSlug
