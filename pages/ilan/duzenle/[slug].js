import dynamic from 'next/dynamic'
import { PetEdit } from '@components/common'
import { Wrapper } from '@components/ui'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const EditPetPost = () => {
  return (
    <Wrapper>
      <Navbar />
      <PetEdit />
    </Wrapper>
  )
}

export default EditPetPost
