import { useQuery } from '@apollo/client'
import { sendToast } from '@features/ui/uiSlice'
import { GET_ALL_PET_POSTS } from '@graphql/queries'
import { useDispatch } from 'react-redux'
import PetDisplayLoading from './PetDisplayLoading'
import Pets from './Pets'
import PetDisplayEmptyState from './PetDisplayEmptyState'

const PetDisplay = ({ className, title, infoType, filters }) => {
  const dispatch = useDispatch()

  const { data, loading } = useQuery(GET_ALL_PET_POSTS, {
    variables: {
      input: {
        limit: '3',
        ...filters,
      },
    },
    fetchPolicy: 'no-cache',
    onError: (error) => {
      dispatch(
        sendToast({
          type: 'error',
          message: error.message,
        })
      )
    },
  })

  if (data?.petPosts?.docs?.length === 0)
    return <PetDisplayEmptyState title={title} infoType={infoType} />

  return (
    <div className={`${className}`}>
      {title && (
        <h1 className='text-2xl md:text-4xl font-bold mb-8'>{title}</h1>
      )}
      {loading && <PetDisplayLoading />}
      {data?.petPosts?.docs && !loading && (
        <Pets infoType={infoType} posts={data.petPosts} />
      )}
    </div>
  )
}

export default PetDisplay
