import { DefaultLayout, PetEdit } from '@components/common'
import { Wrapper } from '@components/ui'
import { GET_PET_POST } from '@graphql/queries'
import { apolloClient } from '@utils'
import { verify } from 'jsonwebtoken'
import { ClientOnly } from '@components/shared'

const EditPetPost = ({ data }) => {
  return (
    <Wrapper>
      <ClientOnly>
        <PetEdit data={data} />
      </ClientOnly>
    </Wrapper>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query
  const token = context?.req?.headers?.cookie?.split('token=')[1]

  const { data } = await apolloClient.query({
    context: { headers: { authorization: `Bearer ${token}` } },
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
  try {
    const { id, isAdmin } = verify(token, process.env.JWT_SECRET)
    if (data.petPost.user._id !== id && !isAdmin) {
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

  const { petPost } = data

  return {
    props: {
      data: petPost,
    },
  }
}

EditPetPost.Layout = DefaultLayout
export default EditPetPost
