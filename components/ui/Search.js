import { Button } from '@components/ui'
import { useRouter } from 'next/router'
import useTurkeyCities from 'use-turkey-cities'
import dynamic from 'next/dynamic'
import { useMediaQuery } from 'react-responsive'
import { useState } from 'react'
import { formatLocationOptions } from '@utils'

const ReactSelect = dynamic(() => import('react-select'), {
  ssr: false,
})

const Search = () => {
  const [isCitySelected, setIsCitySelected] = useState(false)
  const [isDistrictSelected, setIsDistrictSelected] = useState(false)

  const router = useRouter()

  const { cities, city, setCity, districts, district, setDistrict } =
    useTurkeyCities()

  const isLaptop = useMediaQuery({ query: '(max-width: 1024px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const petType = e.nativeEvent.submitter.value
    let paramsString = []
    if (isCitySelected) {
      paramsString.push(`city=${city}`)
    }
    if (isCitySelected && isDistrictSelected) {
      paramsString.push(`district=${district}`)
    }
    if (petType) {
      paramsString.push(`animal=${petType}`)
    }
    router.push(`/ilan/ara/?${paramsString.join('&')}`)
  }

  const cityStyles = {
    control: () => ({
      minWidth: !isLaptop && 200,
      display: 'flex',
      border: '1px solid black',
      borderRadius: isTablet ? 999 : '999px 0 0 999px',
      borderRight: !isTablet && 0,
      padding: 6,
    }),
    singleValue: (provided, state) => {
      return { ...provided }
    },
  }

  const districtStyles = {
    control: () => ({
      minWidth: !isLaptop && 200,
      display: 'flex',
      border: '1px solid black',
      borderRadius: isTablet ? 999 : 0,
      borderRight: !isTablet && 0,
      borderLeft: !isTablet && 0,
      padding: 6,
      marginTop: isTablet && 8,
    }),
    singleValue: (provided, state) => {
      return { ...provided }
    },
  }

  return (
    <form
      className='flex items-center md:items-start flex-col md:flex-row'
      onSubmit={handleSubmit}
    >
      <ReactSelect
        value={city.value}
        onChange={(v) => {
          setIsCitySelected(true)
          setCity(v.value)
        }}
        options={formatLocationOptions(cities)}
        placeholder='Şehir'
        styles={cityStyles}
        maxMenuHeight={200}
        className='w-full'
      />
      <ReactSelect
        value={district.value}
        onChange={(v) => {
          setIsDistrictSelected(true)
          setDistrict(v.value)
        }}
        options={formatLocationOptions(districts)}
        placeholder='İlçe/Semt'
        styles={districtStyles}
        maxMenuHeight={200}
        className='w-full'
      />

      <div className='md:border md:border-black md:border-solid md:border-l-0 rounded-full md:rounded-l-none md:rounded-r-full flex flex-wrap md:flex-nowrap gap-1 justify-center items-center pt-2 md:py-1 md:pr-1'>
        <Button size='small' value='DOG' grow>
          Köpek Bul
        </Button>
        <Button size='small' value='CAT' grow>
          Kedi Bul
        </Button>
        <Button size='small' grow>
          Hepsini Gör
        </Button>
      </div>
    </form>
  )
}

export default Search
