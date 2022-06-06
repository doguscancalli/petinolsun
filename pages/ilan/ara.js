import { DefaultLayout, PetPostSearchView } from '@components/common'
import { Wrapper } from '@components/ui'
import { ClientOnly } from '@components/shared'
import { NextSeo } from 'next-seo'

const PetPostSearch = () => {
  return (
    <Wrapper>
      <NextSeo title='İlanlar' />
      <ClientOnly>
        <PetPostSearchView />
      </ClientOnly>
    </Wrapper>
  )
}

PetPostSearch.Layout = DefaultLayout
export default PetPostSearch
