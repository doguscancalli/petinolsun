import { Hero, PetDisplay, PostDisplay } from '@components/common'
import { ClientOnly } from '@components/shared'
import { Wrapper } from '@components/ui'
import { HomeLayout } from '@components/common'
import { NextSeo } from 'next-seo'
// import { GET_SEO_SETTINGS } from '@graphql/queries'
// import { apolloClient } from '@utils'

const Home = () => {
  return (
    <ClientOnly>
      <NextSeo title='Anasayfa' />
      <Hero />
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
  )
}

// export async function getServerSideProps(context) {
//   const { data } = await apolloClient.query({
//     query: GET_SEO_SETTINGS,
//     errorPolicy: 'all',
//   })

//   return {
//     props: {
//       seoSettings: data.seoSettings,
//     },
//   }
// }

Home.Layout = HomeLayout
export default Home
