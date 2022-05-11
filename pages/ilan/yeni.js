import dynamic from 'next/dynamic'
import { PetForm, StepProgress } from '@components/common'
import { Wrapper } from '@components/ui'
import { useSelector } from 'react-redux'
import { ClientOnly } from '@components/shared'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const NewPetPost = () => {
  const { formStep, totalSteps } = useSelector((state) => state.petPost)

  const handleStep = () => {
    if (formStep === -1) {
      return '1/6'
    }
    return `${formStep + 1}/${totalSteps}`
  }

  return (
    <>
      <Wrapper>
        <Navbar />
        <div className='max-w-lg mx-auto mt-16'>
          <StepProgress step={handleStep()} />
          <ClientOnly>
            <PetForm />
          </ClientOnly>
        </div>
      </Wrapper>
    </>
  )
}

export default NewPetPost
