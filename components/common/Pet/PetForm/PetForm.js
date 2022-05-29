import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import petFormFlow from '@data/petFormFlow'
import dynamic from 'next/dynamic'
import { ClientOnly } from '@components/shared'
const SelectPostType = dynamic(() => import('./SelectPostType'), {
  ssr: false,
})

const PetForm = () => {
  const [flow, setFlow] = useState(null)
  const [photos, setPhotos] = useState(null)

  const {
    data: { postType },
    formStep,
  } = useSelector((state) => state.petPost)

  useEffect(() => {
    setFlow(petFormFlow[postType])
  }, [postType])

  const Component =
    formStep >= 0 ? petFormFlow[postType][formStep].component : <></>

  return (
    <div className='mt-16'>
      <ClientOnly>
        {formStep === -1 && <SelectPostType />}
        {formStep >= 0 && flow && (
          <Component
            flow={flow}
            step={formStep}
            photos={photos}
            setPhotos={setPhotos}
          />
        )}
      </ClientOnly>
    </div>
  )
}

export default PetForm
