import { Button, Select } from '@components/ui'
import { POST_TYPE } from '@data/constants'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import {
  setData,
  increaseFormStep,
  setTotalSteps,
  clearData,
} from '@features/petPost/petPostSlice'
import petFormFlow from '@data/petFormFlow'
import { objectToArray } from '@utils'

const SelectPostType = () => {
  const { register, handleSubmit } = useForm()

  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const onSubmit = ({ postType }) => {
    dispatch(clearData())
    dispatch(setData({ postType }))
    dispatch(increaseFormStep())
    dispatch(setTotalSteps(petFormFlow[postType].length))
  }

  const options = objectToArray(POST_TYPE)

  return (
    <>
      <h1 className='flex flex-col text-2xl md:text-4xl font-bold'>
        <span>Merhaba, {user?.name?.split(' ')[0]}</span>
        <span>Hadi ilanını oluşturalım.</span>
      </h1>
      <h2 className='text-xl md:text-2xl font-bold mt-16'>
        Oluşturmak istediğin ilan türünü seç
      </h2>
      <form
        className='mt-4 flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Select options={options} {...register('postType')} />
        <Button>Devam Et</Button>
      </form>
    </>
  )
}

export default SelectPostType
