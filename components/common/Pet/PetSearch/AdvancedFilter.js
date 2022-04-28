import { useState } from 'react'
import { tr } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

import { Button, Checkbox, Select } from '@components/ui'

const AdvancedFilter = ({ setToggleAdvancedFilter }) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <div>
      <h2 className='text-2xl md:text-4xl font-bold'>Detaylı Arama</h2>
      <form className='flex flex-col gap-4 mt-8' onSubmit={handleSubmit}>
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
          <Checkbox label='Sahiplendirme' htmlFor='adoption' />
          <Checkbox label='Sahiplenme' htmlFor='ownership' />
          <Checkbox label='Kayıp' htmlFor='lost' />
          <Checkbox label='Buldum' htmlFor='found' />
        </div>
        <h2 className='text-lg md:text-2xl font-bold'>Hayvan</h2>
        <Select />
        <h2 className='text-lg md:text-2xl font-bold'>Şehir</h2>
        <Select />
        <h2 className='text-lg md:text-2xl font-bold'>Cinsiyet</h2>
        <div className='flex flex-wrap gap-4'>
          <Checkbox label='Erkek' htmlFor='male' />
          <Checkbox label='Dişi' htmlFor='female' />
        </div>
        <h2 className='text-lg md:text-2xl font-bold'>Yaş</h2>
        <div className='flex flex-wrap gap-4'>
          <Checkbox label='Yavru' htmlFor='baby' />
          <Checkbox label='Genç' htmlFor='young' />
          <Checkbox label='Yetişkin' htmlFor='adult' />
          <Checkbox label='Yaşlı' htmlFor='old' />
        </div>
        <Button>Ara</Button>
        <Button
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
