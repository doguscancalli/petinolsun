import { useDispatch } from 'react-redux'
import {
  decreaseFormStep,
  increaseFormStep,
  setData,
} from '@features/petPost/petPostSlice'
import { useForm } from 'react-hook-form'
import { Button, Select } from '@components/ui'
import { ANIMAL, AGE, GENDER } from '@data/constants'

const PetDetails = ({ flow, step }) => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const animalOptions = Object.keys(ANIMAL).map((key) => {
    return {
      name: ANIMAL[key],
      value: key,
    }
  })

  const ageOptions = Object.keys(AGE).map((key) => {
    return {
      name: AGE[key],
      value: key,
    }
  })

  const genderOptions = Object.keys(GENDER).map((key) => {
    return {
      name: GENDER[key],
      value: key,
    }
  })

  const onSubmit = (data) => {
    dispatch(setData(data))
    dispatch(increaseFormStep())
  }

  return (
    <>
      <form
        className='mt-4 flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='text-xl md:text-2xl font-bold'>{flow[step].form.pet}</h2>
        <Select options={animalOptions} {...register('pet')} />
        <h2 className='text-xl md:text-2xl font-bold'>{flow[step].form.age}</h2>
        <Select options={ageOptions} {...register('age')} />
        <h2 className='text-xl md:text-2xl font-bold'>
          {flow[step].form.gender}
        </h2>
        <Select options={genderOptions} {...register('gender')} />
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

export default PetDetails
