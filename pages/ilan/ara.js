import { DefaultLayout, PetPostSearchView } from '@components/common'
import { Wrapper } from '@components/ui'
import { ClientOnly } from '@components/shared'

const PetPostSearch = () => {
  return (
    <Wrapper>
      <ClientOnly>
        <PetPostSearchView />
      </ClientOnly>
    </Wrapper>
  )
}

PetPostSearch.Layout = DefaultLayout
export default PetPostSearch
