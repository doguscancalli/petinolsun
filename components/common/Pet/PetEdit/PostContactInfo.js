import { Button } from '@components/ui'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_PET_POST } from '@graphql/mutations'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { setEditData } from '@features/petPost/petPostSlice'
import { useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'

const PostContactInfo = ({ id, data, setSelectedField }) => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm()

  const [updateFields, { data: updatedData, loading, error }] = useMutation(
    UPDATE_PET_POST,
    {
      errorPolicy: 'all',
    }
  )

  const validations = {
    required: 'Telefon numarası gerekli',
  }

  const onSubmit = async (fields) => {
    await updateFields({
      variables: {
        id,
        input: {
          ...fields,
        },
      },
    })
  }

  useEffect(() => {
    if (updatedData) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'İlan güncellendi',
        })
      )
      dispatch(setEditData(getValues()))
      setSelectedField('')
    }
  }, [updatedData])

  useEffect(() => {
    if (error) {
      error.graphQLErrors.forEach((error) =>
        dispatch(
          sendToast({
            type: 'error',
            message: error?.extensions?.originalError?.message,
          })
        )
      )
    }
  }, [error])

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-lg md:text-2xl font-bold'>İletişim</h2>
      <Controller
        control={control}
        rules={validations}
        name='contactNumber'
        render={({ field: { onChange } }) => {
          return (
            <div>
              <PhoneInput
                country={'tr'}
                onChange={(v) => onChange(v)}
                inputProps={{ name: 'contactNumber' }}
                className={errors?.contactNumber && 'error'}
                disabled={loading}
                value={data}
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
      {/* <Checkbox
        label='Whatsapp üzerinden mesaj atabilirler'
        htmlFor='phoneNumber'
        disabled={loading}
        {...register('whatsapp')}
      /> */}
      <Button loading={loading}>Güncelle</Button>
      <Button
        type='button'
        variant='secondary'
        disabled={loading}
        onClick={() => setSelectedField('')}
      >
        İptal
      </Button>
    </form>
  )
}

export default PostContactInfo
