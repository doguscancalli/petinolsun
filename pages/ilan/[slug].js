import { PetView } from '@components/common'
import { Navbar } from '@components/shared'
import { Wrapper } from '@components/ui'

const PetSlug = () => {
  return (
    <>
      <Wrapper>
        <Navbar />
        <PetView />
      </Wrapper>
    </>
  )
}

export default PetSlug
