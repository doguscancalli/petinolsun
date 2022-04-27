import { PetForm, StepProgress } from '@components/common'
import { Navbar } from '@components/shared'
import { Wrapper } from '@components/ui'

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
