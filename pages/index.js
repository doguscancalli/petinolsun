import { apolloClient } from '@utils'
import { Hero, PetDisplay, PostDisplay } from '@components/common'
import { GET_ALL_PET_POSTS } from '@graphql/queries'
import { store } from '../store'
import { Provider } from 'react-redux'
import { ClientOnly } from '@components/shared'
import { Wrapper } from '@components/ui'

const Home = () => {
  // const Home = ({ petPosts }) => {
  // const { adoptionPosts, ownershipPosts, lostPosts, foundPosts } = petPosts
  return (
    <Provider store={store}>
      <Hero />
      <ClientOnly>
        <Wrapper className='flex flex-col gap-16 mt-16'>
          <PetDisplay
            title='Sahiplendirme ilanları'
            infoType='ADOPTION'
            filters={{
              listing: true,
              limit: '3',
              postType: 'ADOPTION',
            }}
          />
          <PetDisplay
            title='Kayıp ilanları'
            infoType='LOST'
            filters={{
              listing: true,
              limit: '3',
              postType: 'LOST',
            }}
          />
          <PostDisplay
            title='Son gönderiler'
            filters={{ limit: '3' }}
            horizontal
          />
          <PetDisplay
            title='Sahiplenme ilanları'
            infoType='OWNERSHIP'
            filters={{
              listing: true,
              limit: '3',
              postType: 'OWNERSHIP',
            }}
          />
          <PetDisplay
            title='Bulunma ilanları'
            infoType='FOUND'
            filters={{
              listing: true,
              limit: '3',
              postType: 'FOUND',
            }}
          />
        </Wrapper>
      </ClientOnly>
    </Provider>
  )
}

export default Home
