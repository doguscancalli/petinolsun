import { useDispatch } from 'react-redux'
import {
  increaseFormStep,
  decreaseFormStep,
  setData,
} from '@features/petPost/petPostSlice'
import { useForm } from 'react-hook-form'
import { Button, Input } from '@components/ui'

const Location = ({ flow, step }) => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const validations = {
    location: {
      required: 'Lokasyon gerekli',
      maxLength: {
        value: 30,
        message: 'Lokasyon 30 karakterden fazla olamaz',
      },
    },
  }

  const onSubmit = (data) => {
    dispatch(setData(data))
    dispatch(increaseFormStep())
  }

  return (
    <>
      <h2 className='text-xl md:text-2xl font-bold'>
        {flow[step].form.location}
      </h2>
      <p className='mt-4 text-black-500'>
        Güvenliğiniz açısından şehir, ilçe/semt girmeniz önerilir
      </p>
      <form
        className='mt-4 flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder='Şehir, ilçe/semt'
          error={errors?.location}
          errorMessage={errors?.location?.message}
          {...register('location', { ...validations.location })}
        />
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
