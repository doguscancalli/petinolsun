import { Button, Select } from '@components/ui'

const SelectPostType = ({ state, setState }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    setState({ ...state, petPostType: 'found' })
  }

  return (
    <>
      <h1 className='flex flex-col text-2xl md:text-4xl font-bold'>
        <span>Merhaba, Clara!</span>
        <span>Hadi ilanını oluşturalım.</span>
      </h1>
      <h2 className='text-xl md:text-2xl font-bold mt-16'>
        Oluşturmak istediğin ilan türünü seç
      </h2>
      <form className='mt-4 flex flex-col gap-4' onSubmit={handleSubmit}>
        <Select />
        <Button>Devam Et</Button>
      </form>
    </>
  )
}

export default SelectPostType
