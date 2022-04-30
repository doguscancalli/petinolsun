import { apolloClient } from '@utils'
import { Hero, PetDisplay } from '@components/common'
import { GET_ALL_PET_POSTS } from '@graphql/queries'

const Home = ({ petPosts }) => {
  const { adoptionPosts, ownershipPosts, lostPosts, foundPosts } = petPosts
  return (
    <>
      <Hero />
      {adoptionPosts?.docs?.length > 0 && (
        <PetDisplay
          title='Sahiplendirme ilanları'
          infoType='adoption'
          posts={adoptionPosts}
        />
      )}

      {ownershipPosts?.docs?.length > 0 && (
        <PetDisplay
          title='Kayıp ilanları'
          infoType='lost'
          posts={ownershipPosts}
        />
      )}
      {lostPosts?.docs?.length > 0 && (
        <PetDisplay
          title='Sahiplenme ilanları'
          infoType='ownership'
          posts={lostPosts}
        />
      )}
      {foundPosts?.docs?.length > 0 && (
        <PetDisplay
          title='Bulunma ilanları'
          infoType='found'
          posts={foundPosts}
        />
      )}
    </>
  )
}

export async function getServerSideProps() {
  const {
    data: { petPosts: adoptionPosts },
  } = await apolloClient.query({
    query: GET_ALL_PET_POSTS,
    variables: {
      input: {
        limit: 3,
        page: 1,
        postType: 'adoption',
      },
    },
  })

  const {
    data: { petPosts: ownershipPosts },
  } = await apolloClient.query({
    query: GET_ALL_PET_POSTS,
    variables: {
      input: {
        limit: 3,
        page: 1,
        postType: 'ownership',
      },
    },
  })

  const {
    data: { petPosts: lostPosts },
  } = await apolloClient.query({
    query: GET_ALL_PET_POSTS,
    variables: {
      input: {
        limit: 3,
        page: 1,
        postType: 'lost',
      },
    },
  })

  const {
    data: { petPosts: foundPosts },
  } = await apolloClient.query({
    query: GET_ALL_PET_POSTS,
    variables: {
      input: {
        limit: 3,
        page: 1,
        postType: 'found',
      },
    },
  })

  return {
    props: {
      petPosts: {
        adoptionPosts,
        ownershipPosts,
        lostPosts,
        foundPosts,
      },
    },
  }
}

export default Home
