import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import {
  clearData,
  decreaseFormStep,
  setData,
} from '@features/petPost/petPostSlice'
import { useForm, Controller } from 'react-hook-form'
import { Button, Checkbox } from '@components/ui'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useMutation } from '@apollo/client'
import { CREATE_PET_POST } from '@graphql/mutations'
import { useRouter } from 'next/router'
import { imageUpload } from '@utils'

const ContactInfo = ({ photos }) => {
  const [isImageUploading, setIsImageUploading] = useState(false)

  const { data: petPostData } = useSelector((state) => state.petPost)
  const dispatch = useDispatch()

  const [createPetPost, { data, loading, error }] = useMutation(
    CREATE_PET_POST,
    {
      errorPolicy: 'all',
    }
  )

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  const validations = {
    required: 'Telefon numarası gerekli',
  }

  const onSubmit = (fields) => {
    if (loading) return
    dispatch(setData(fields))
  }

  useEffect(() => {
    if (data) {
      router.push(`/ilan/${data.createPetPost.slug}`)
      dispatch(
        sendToast({
          type: 'success',
          message: 'İlan başarıyla oluşturuldu, yönlendiriliyorsunuz',
        })
      )
      dispatch(clearData())
    }
  }, [data])

  useEffect(() => {
    if (error) {
      console.log(error)
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

  const handleCreatePetPost = async () => {
    setIsImageUploading(true)
    const urls = await imageUpload(photos)
    setIsImageUploading(false)
    createPetPost({
      variables: { input: { ...petPostData, photos: urls } },
    })
  }

  useEffect(() => {
    if (petPostData.contactNumber) {
      handleCreatePetPost()
    }
  }, [petPostData])

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
                  disabled={loading || isImageUploading}
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
          htmlFor='whatsapp'
          disabled={loading || isImageUploading}
          {...register('whatsapp')}
        />
        <div className='flex flex-col gap-2'>
          <Button type='submit' loading={loading || isImageUploading} grow>
            İlanı Paylaş
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => dispatch(decreaseFormStep())}
            disabled={loading || isImageUploading}
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
