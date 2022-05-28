import { Button, Select } from '@components/ui'
import { useMutation } from '@apollo/client'
import { UPDATE_PET_POST } from '@graphql/mutations'
import { useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { setEditData } from '@features/petPost/petPostSlice'
import { useEffect } from 'react'
import useTurkeyCities from 'use-turkey-cities'
import { formatLocationOptions } from '@utils'

const PostLocation = ({ id, data, setSelectedField }) => {
  const dispatch = useDispatch()

  const { cities, city, setCity, districts, district, setDistrict } =
    useTurkeyCities()

  useEffect(() => {
    setCity(data[0])
    setDistrict(data[1])
  }, [])

  const [updateFields, { data: updatedData, loading, error }] = useMutation(
    UPDATE_PET_POST,
    {
      errorPolicy: 'all',
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateFields({
      variables: {
        id,
        input: {
          city,
          district,
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
      dispatch(setEditData({ city, district }))
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
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h2 className='text-lg md:text-2xl font-bold'>Lokasyon</h2>
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
      <Button type='submit' loading={loading}>
        Güncelle
      </Button>
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

export default PostLocation
