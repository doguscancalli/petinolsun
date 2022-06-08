import { DefaultLayout, PetEdit } from '@components/common'
import { Wrapper } from '@components/ui'
import { GET_PET_POST } from '@graphql/queries'
import { apolloClient } from '@utils'
import { verify } from 'jsonwebtoken'
import { ClientOnly } from '@components/shared'
import { NextSeo } from 'next-seo'
import { POST_TYPE } from '@data/constants'

const EditPetPost = ({ data }) => {
  const { name, postType } = data

  return (
    <Wrapper>
      <NextSeo
        title={`${name} adlı ${POST_TYPE[
          postType
        ].toLowerCase()} ilanınızı düzenleyin`}
      />
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
