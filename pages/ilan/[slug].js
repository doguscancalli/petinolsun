import { DefaultLayout, PetView } from '@components/common'
import { Wrapper } from '@components/ui'
import { apolloClient } from '@utils'
import { GET_PET_POST } from '@graphql/queries'
import { NextSeo, ArticleJsonLd } from 'next-seo'

const PetSlug = ({ petPost }) => {
  const { name, slug, description, photos, user, createdAt, updatedAt } =
    petPost

  return (
    <Wrapper>
      <NextSeo title={name} description={`${description.slice(0, 157)}...`} />
      <ArticleJsonLd
        type='Blog'
        url={`https://petin.com/ilan/${slug}`}
        title={name}
        images={photos}
        datePublished={createdAt}
        dateModified={updatedAt}
        authorName={user.name}
        description={`${description.slice(0, 157)}...`}
      />
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
