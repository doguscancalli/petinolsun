import { Button, Select } from '@components/ui'

const PetDetails = ({ state, setState }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    setState({ ...state, petFormStep: state.petFormStep + 1 })
  }

  return (
    <>
      <form className='mt-4 flex flex-col gap-4' onSubmit={handleSubmit}>
        <h2 className='text-xl md:text-2xl font-bold'>
          {state.petFormFlow[state.petFormStep].form.pet}
        </h2>
        <Select />
        <h2 className='text-xl md:text-2xl font-bold'>
          {state.petFormFlow[state.petFormStep].form.age}
        </h2>
        <Select />
        <h2 className='text-xl md:text-2xl font-bold'>
          {state.petFormFlow[state.petFormStep].form.gender}
        </h2>
        <Select />
        <div className='flex flex-col gap-2'>
          <Button grow>Devam Et</Button>
          <Button variant='secondary' grow>
            Geri
          </Button>
        </div>
      </form>
    </>
  )
}

export default PetDetails
