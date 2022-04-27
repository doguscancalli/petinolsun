import { Button, Input } from '@components/ui'

const Location = ({ state, setState }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    setState({ ...state, petFormStep: state.petFormStep + 1 })
  }

  return (
    <>
      <h2 className='text-xl md:text-2xl font-bold'>
        {state.petFormFlow[state.petFormStep].form.location}
      </h2>
      <p className='mt-4 text-black-500'>
        Tam adres yerine semt, mahalle gibi belirli bir alan girin
      </p>
      <form className='mt-4 flex flex-col gap-4' onSubmit={handleSubmit}>
        <Input placeholder='Şehir, semt, mahalle' />
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

export default Location
