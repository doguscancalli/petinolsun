import { useDispatch } from 'react-redux'
import { decreaseFormStep, setData } from '@features/petPost/petPostSlice'
import { useForm, Controller } from 'react-hook-form'
import { Button, Checkbox } from '@components/ui'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const ContactInfo = () => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const validations = {
    required: 'Telefon numarası gerekli',
  }

  const onSubmit = (data) => {
    dispatch(setData(data))
  }
  return (
    <>
      <form
        className='mt-4 flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='text-xl md:text-2xl font-bold'>
          İletişim bilgilerinizi girin
        </h2>
        <Controller
          control={control}
          rules={validations}
          defaultValue=''
          name='contactNumber'
          render={({ field: { onChange } }) => {
            return (
              <div>
                <PhoneInput
                  country={'tr'}
                  onChange={(v) => onChange(v)}
                  inputProps={{ name: 'contactNumber' }}
                  className={errors?.contactNumber && 'error'}
                />
                {errors?.contactNumber?.message && (
                  <p className='text-red text-xs px-6 pt-1'>
                    {errors?.contactNumber?.message}
                  </p>
                )}
              </div>
            )
          }}
        />
        <Checkbox
          label='Whatsapp üzerinden mesaj atabilirler'
          htmlFor='phoneNumber'
          {...register('whatsapp')}
        />
        <div className='flex flex-col gap-2'>
          <Button type='submit' grow>
            İlanı Paylaş
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

export default ContactInfo
