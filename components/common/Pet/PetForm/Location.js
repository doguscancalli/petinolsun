import { useDispatch } from 'react-redux'
import {
  increaseFormStep,
  decreaseFormStep,
  setData,
} from '@features/petPost/petPostSlice'
import { Button } from '@components/ui'
import useTurkeyCities from 'use-turkey-cities'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { formatLocationOptions } from '@utils'

const ReactSelect = dynamic(() => import('react-select'), {
  ssr: false,
})

const Location = ({ flow, step }) => {
  const [isCitySelected, setIsCitySelected] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [isDistrictSelected, setIsDistrictSelected] = useState(false)
  const [districtError, setDistrictError] = useState(false)

  const dispatch = useDispatch()

  const { cities, city, setCity, districts, district, setDistrict } =
    useTurkeyCities()

  const handleSubmit = (e) => {
    e.preventDefault()
    setCityError(false)
    setDistrictError(false)
    if (!isCitySelected) {
      setCityError(true)
      return
    }
    if (!isDistrictSelected) {
      setDistrictError(true)
      return
    }
    dispatch(setData({ city, district }))
    dispatch(increaseFormStep())
  }

  const cityStyles = {
    control: () => ({
      display: 'flex',
      border: '1px solid black',
      borderColor: cityError && '#ff2771',
      borderRadius: 999,
      padding: 6,
      background: 'white',
    }),
    singleValue: (provided, state) => {
      return { ...provided }
    },
  }

  const districtStyles = {
    control: () => ({
      display: 'flex',
      border: '1px solid black',
      borderColor: districtError && '#ff2771',
      borderRadius: 999,
      padding: 6,
      background: 'white',
    }),
    singleValue: (provided, state) => {
      return { ...provided }
    },
  }

  return (
    <>
      <h2 className='text-xl md:text-2xl font-bold'>
        {flow[step].form.location}
      </h2>
      <form className='mt-4 flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <ReactSelect
            value={city.name}
            onChange={(v) => {
              setIsCitySelected(true)
              setCity(v.name)
            }}
            options={formatLocationOptions(cities)}
            placeholder='Şehir'
            styles={cityStyles}
            maxMenuHeight={200}
            className='w-full'
          />
          {cityError && (
            <p className='text-red text-xs px-6 pt-1'>Bir şehir seçin</p>
          )}
        </div>
        <div>
          <ReactSelect
            value={district.name}
            onChange={(v) => {
              setIsDistrictSelected(true)
              setDistrict(v.name)
            }}
            options={formatLocationOptions(districts)}
            placeholder='İlçe/Semt'
            styles={districtStyles}
            maxMenuHeight={200}
            className='w-full'
          />
          {districtError && (
            <p className='text-red text-xs px-6 pt-1'>Bir ilçe/semt seçin</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <Button type='submit' grow>
            Devam Et
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => dispatch(decreaseFormStep())}
            grow
          >
            Geri
          </Button>
        </div>
      </form>
    </>
  )
}

export default Location
