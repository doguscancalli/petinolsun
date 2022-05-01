import dynamic from 'next/dynamic'
import { PetPostSearchView } from '@components/common'
import { Wrapper } from '@components/ui'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const PetPostSearch = () => {
  return (
    <Wrapper>
      <Navbar />
      <PetPostSearchView />
    </Wrapper>
  )
}

export default PetPostSearch
