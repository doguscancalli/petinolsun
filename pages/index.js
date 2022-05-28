import { apolloClient } from '@utils'
import { Hero, PetDisplay } from '@components/common'
import { GET_ALL_PET_POSTS } from '@graphql/queries'
import { store } from '../store'
import { Provider } from 'react-redux'

const Home = ({ petPosts }) => {
  const { adoptionPosts, ownershipPosts, lostPosts, foundPosts } = petPosts
  return (
    <Provider store={store}>
      <Hero />
      {adoptionPosts?.docs?.length > 0 && (
        <PetDisplay
          title='Sahiplendirme ilanları'
          infoType='ADOPTION'
          posts={adoptionPosts}
        />
      )}

      {ownershipPosts?.docs?.length > 0 && (
        <PetDisplay title='Kayıp ilanları' infoType='LOST' posts={lostPosts} />
      )}
      {lostPosts?.docs?.length > 0 && (
        <PetDisplay
          title='Sahiplenme ilanları'
          infoType='OWNERSHIP'
          posts={ownershipPosts}
        />
      )}
      {foundPosts?.docs?.length > 0 && (
        <PetDisplay
          title='Bulunma ilanları'
          infoType='FOUND'
          posts={foundPosts}
        />
      )}
    </Provider>
  )
}

export async function getServerSideProps() {
  const {
    data: { petPosts: adoptionPosts },
  } = await apolloClient.query({
    query: GET_ALL_PET_POSTS,
    variables: {
      input: {
        limit: '3',
        page: '1',
        postType: 'ADOPTION',
        listing: true,
      },
      fetchPolicy: 'no-cache',
    },
  })

  const {
    data: { petPosts: ownershipPosts },
  } = await apolloClient.query({
    query: GET_ALL_PET_POSTS,
    variables: {
      input: {
        limit: '3',
        page: '1',
        postType: 'OWNERSHIP',
        listing: true,
      },
      fetchPolicy: 'no-cache',
    },
  })

  const {
    data: { petPosts: lostPosts },
  } = await apolloClient.query({
    query: GET_ALL_PET_POSTS,
    variables: {
      input: {
        limit: '3',
        page: '1',
        postType: 'LOST',
        listing: true,
      },
      fetchPolicy: 'no-cache',
    },
  })

  const {
    data: { petPosts: foundPosts },
  } = await apolloClient.query({
    query: GET_ALL_PET_POSTS,
    variables: {
      input: {
        limit: '3',
        page: '1',
        postType: 'FOUND',
        listing: true,
      },
      fetchPolicy: 'no-cache',
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
