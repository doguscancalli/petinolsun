import { useDispatch } from 'react-redux'
import {
  decreaseFormStep,
  increaseFormStep,
  setData,
} from '@features/petPost/petPostSlice'
import { useForm } from 'react-hook-form'
import { Button, Input } from '@components/ui'

const PostDetails = ({ flow, step }) => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const validations = {
    name: {
      required: `${flow[step].form.nameType} gerekli`,
      maxLength: {
        value: 50,
        message: `${flow[step].form.nameType} 50 karakterden fazla olamaz`,
      },
    },
    description: {
      required: 'Açıklama gerekli',
      minLength: {
        value: 20,
        message: 'Açıklama en az 20 karakterden oluşmalıdır',
      },
    },
  }

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
        <h2 className='text-xl md:text-2xl font-bold'>
          {flow[step].form.name}
        </h2>
        <Input
          placeholder={flow[step].form.namePlaceholder}
          error={errors?.description}
          errorMessage={errors?.name?.message}
          {...register('name', { ...validations.name })}
        />
        <h2 className='text-xl md:text-2xl font-bold'>
          İlan hakkında daha fazla bilgi verin
        </h2>
        <Input
          placeholder='İlan açıklaması'
          rows='6'
          textarea
          error={errors?.description}
          errorMessage={errors?.description?.message}
          {...register('description', { ...validations.description })}
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

export default PostDetails
