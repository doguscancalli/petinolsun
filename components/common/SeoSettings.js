import { useMutation } from '@apollo/client'
import { Button, Input } from '@components/ui'
import { sendToast } from '@features/ui/uiSlice'
import { UPDATE_SEO_SETTINGS } from '@graphql/mutations'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const SeoSettings = ({ data }) => {
  const { title, description, keywords } = data

  const dispatch = useDispatch()

  const [updateSeoSettings, { data: updateSeoSettingsData, loading, error }] =
    useMutation(UPDATE_SEO_SETTINGS, {
      errorPolicy: 'all',
    })

  useEffect(() => {
    if (updateSeoSettingsData) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'SEO ayarları başarıyla güncellendi',
        })
      )
    }
  }, [updateSeoSettingsData])

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const validations = {
    title: {
      required: 'Başlık gerekli',
    },
    description: {
      required: 'Açıklama gerekli',
    },
    keywords: {
      required: 'Anahtar kalimeler gerekli',
    },
  }

  const onSubmit = async (fields) => {
    await updateSeoSettings({
      variables: {
        input: {
          ...(fields.title !== title && { title: fields.title }),
          ...(fields.description !== description && {
            description: fields.description,
          }),
          ...(fields.keywords !== keywords && { keywords: !!fields.keywords }),
        },
      },
    })
  }

  return (
    <div className='max-w-lg w-full'>
      <h1 className='text-2xl md:text-4xl font-bold mb-8'>Seo ayarları</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-lg md:text-2xl font-bold'>Site başlığı (Title)</h2>
        <Input
          defaultValue={title}
          type='text'
          placeholder='Başlık'
          error={errors?.title}
          errorMessage={errors?.title?.message}
          disabled={loading}
          {...register('title', { ...validations.title })}
        />
        <h2 className='text-lg md:text-2xl font-bold'>
          Anahtar kelimeler (Keywords)
        </h2>
        <Input
          defaultValue={keywords}
          type='text'
          placeholder='Anahtar kelimeler'
          error={errors?.keywords}
          errorMessage={errors?.keywords?.message}
          disabled={loading}
          {...register('keywords', { ...validations.keywords })}
        />
        <h2 className='text-lg md:text-2xl font-bold'>
          Site açıklaması (Description)
        </h2>
        <Input
          defaultValue={description}
          type='text'
          placeholder='Anahtar kelimeler'
          rows='6'
          textarea
          error={errors?.description}
          errorMessage={errors?.description?.message}
          disabled={loading}
          {...register('description', { ...validations.description })}
        />
        <Button loading={loading}>Güncelle</Button>
      </form>
    </div>
  )
}

export default SeoSettings
