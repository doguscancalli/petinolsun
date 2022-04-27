import { useState, useEffect } from 'react'
import petFormFlow from '@data/petFormFlow'

import SelectPostType from './SelectPostType'

const PetForm = () => {
  const [state, setState] = useState({
    petPostType: '',
    petFormStep: -1,
    petFormFlow: [],
  })

  const Component =
    state.petFormStep >= 0 ? (
      state.petFormFlow[state.petFormStep].component
    ) : (
      <></>
    )

  useEffect(() => {
    if (state.petPostType !== '' && state.petFormStep === -1) {
      console.log(state)
      state.petFormStep = 0
      state.petFormFlow = petFormFlow[state.petPostType]
    }
  }, [state.petPostType])

  return (
    <div className='mt-16'>
      {state.petFormStep === -1 && (
        <SelectPostType state={state} setState={setState} />
      )}
      {state.petFormStep >= 0 && (
        <Component state={state} setState={setState} />
      )}
    </div>
  )
}

export default PetForm
