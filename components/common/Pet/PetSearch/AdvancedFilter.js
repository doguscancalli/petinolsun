import { useState } from 'react'
import { tr } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { Button, Checkbox, Select } from '@components/ui'
import { formatLocationOptions, objectToArray } from '@utils'
import { ANIMAL } from '@data/constants'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTurkeyCities from 'use-turkey-cities'

const AdvancedFilter = ({ setToggleAdvancedFilter }) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const router = useRouter()

  const { cities, city, setCity, districts, district, setDistrict } =
    useTurkeyCities()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleDateStr = (startDate, endDate) => {
    if (!startDate || !endDate) return undefined
    const formattedStartDate = moment(startDate).format('YYYY-MM-DD')
    const formattedEndDate = moment(endDate).format('YYYY-MM-DD')
    return `${formattedStartDate},${formattedEndDate}`
  }

  const handleSelectedFields = (data) => {
    const selectedFields = objectToArray(data).filter(
      (item) => item.name === true
    )
    const string = selectedFields.map((item) => item.value).join(',')
    return string === '' ? undefined : string
  }

  const onSubmit = async (fields) => {
    const { postType, gender, age, animal } = fields
    let paramsString = []
    const postTypeStr = handleSelectedFields(postType)
    if (postTypeStr) {
      paramsString.push(`postType=${postTypeStr}`)
    }
    const genderStr = handleSelectedFields(gender)
    if (genderStr) {
      paramsString.push(`gender=${genderStr}`)
    }
    const ageStr = handleSelectedFields(age)
    if (ageStr) {
      paramsString.push(`age=${ageStr}`)
    }
    const dateStr = handleDateStr(startDate, endDate)
    if (dateStr) {
      paramsString.push(`createdAt=${dateStr}`)
    }
    const animalStr = animal
    if (animalStr) {
      paramsString.push(`animal=${animalStr}`)
    }
    paramsString.push('page=1')
    router.push(`?${paramsString.join('&')}`, undefined, { shallow: true })
    setToggleAdvancedFilter(false)
  }

  const animalOptions = objectToArray(ANIMAL)

  return (
    <div>
      <h2 className='text-2xl md:text-4xl font-bold'>Detaylı Arama</h2>
      <form
        className='flex flex-col gap-4 mt-8'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='text-lg md:text-2xl font-bold'>Tarih</h2>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          minimumDate={new Date('01/01/2022')}
          minimumLength={1}
          format='dd MMM yyyy'
          locale={tr}
        >
          {({ startDateInputProps, endDateInputProps, focus }) => (
            <div className='date-range flex gap-1 flex-col md:flex-row'>
              <input
                className={'input' + (focus === START_DATE ? ' -focused' : '')}
                {...startDateInputProps}
                placeholder='Başlangıç tarihi'
              />
              <span className='date-range_arrow' />
              <input
                className={'input' + (focus === END_DATE ? ' -focused' : '')}
                {...endDateInputProps}
                placeholder='Bitiş tarihi'
              />
            </div>
          )}
        </DateRangePicker>
        <h2 className='text-lg md:text-2xl font-bold'>İlan Türü</h2>
        <div className='flex flex-wrap gap-4'>
          <Checkbox
            label='Sahiplendirme'
            htmlFor='adoption'
            {...register('postType.ADOPTION')}
          />
          <Checkbox
            label='Sahiplenme'
            htmlFor='ownership'
            {...register('postType.OWNERSHIP')}
          />
          <Checkbox
            label='Kayıp'
            htmlFor='lost'
            {...register('postType.LOST')}
          />
          <Checkbox
            label='Buldum'
            htmlFor='found'
            {...register('postType.FOUND')}
          />
        </div>
        <h2 className='text-lg md:text-2xl font-bold'>Hayvan</h2>
        <Select options={animalOptions} {...register('animal')} />
        <h2 className='text-lg md:text-2xl font-bold'>Şehir</h2>
        <Select
          onChange={(e) => {
            setCity(e.target.value)
          }}
          value={city}
          options={formatLocationOptions(cities)}
        />
        <h2 className='text-lg md:text-2xl font-bold'>İlçe/Semt</h2>
        <Select
          onChange={(e) => {
            setDistrict(e.target.value)
          }}
          value={district}
          options={formatLocationOptions(districts)}
        />
        <h2 className='text-lg md:text-2xl font-bold'>Cinsiyet</h2>
        <div className='flex flex-wrap gap-4'>
          <Checkbox label='Erkek' htmlFor='male' {...register('gender.MALE')} />
          <Checkbox
            label='Dişi'
            htmlFor='female'
            {...register('gender.FEMALE')}
          />
        </div>
        <h2 className='text-lg md:text-2xl font-bold'>Yaş</h2>
        <div className='flex flex-wrap gap-4'>
          <Checkbox label='Yavru' htmlFor='baby' {...register('age.BABY')} />
          <Checkbox label='Genç' htmlFor='young' {...register('age.YOUNG')} />
          <Checkbox
            label='Yetişkin'
            htmlFor='adult'
            {...register('age.ADULT')}
          />
          <Checkbox label='Yaşlı' htmlFor='old' {...register('age.OLD')} />
        </div>
        <Button>Ara</Button>
        <Button
          type='button'
          variant='secondary'
          onClick={() => setToggleAdvancedFilter(false)}
        >
          İptal
        </Button>
      </form>
    </div>
  )
}

export default AdvancedFilter
