import dynamic from 'next/dynamic'
import { PetPostSearchView } from '@components/common'
import { Wrapper } from '@components/ui'
import { ClientOnly } from '@components/shared'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const PetPostSearch = () => {
  return (
    <Wrapper>
      <Navbar />
      <ClientOnly>
        <PetPostSearchView />
      </ClientOnly>
    </Wrapper>
  )
}

export default PetPostSearch
