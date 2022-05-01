import dynamic from 'next/dynamic'
import { PetForm, StepProgress } from '@components/common'
import { Wrapper } from '@components/ui'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const NewPetPost = () => {
  return (
    <>
      <Wrapper>
        <Navbar />
        <div className='max-w-lg mx-auto mt-16'>
          <StepProgress step='1/6' />
          <PetForm />
        </div>
      </Wrapper>
    </>
  )
}

export default NewPetPost
