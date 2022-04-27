import { Button } from '@components/ui'

const Search = () => {
  return (
    <div className='flex items-center flex-col md:flex-row'>
      <input
        className='bg-white border border-black border-solid md:border-r-0 px-6 py-3 outline-none w-full rounded-full md:rounded-r-none md:rounded-l-full'
        placeholder='Şehir'
      />
      <div className='md:border md:border-black md:border-solid md:border-l-0 rounded-full md:rounded-l-none md:rounded-r-full flex flex-wrap md:flex-nowrap gap-1 justify-center items-center pt-2 md:py-1 md:pr-1'>
        <Button size='small' grow>
          Kedi Bul
        </Button>
        <Button size='small' grow>
          Köpek Bul
        </Button>
        <Button size='small' grow>
          Diğer Hayvanları Bul
        </Button>
      </div>
    </div>
  )
}

export default Search
