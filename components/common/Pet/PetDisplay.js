import { useQuery } from '@apollo/client'
import { sendToast } from '@features/ui/uiSlice'
import { GET_ALL_PET_POSTS } from '@graphql/queries'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PulseLoader } from 'react-spinners'
import Pets from './Pets'

const PetDisplay = ({ className, title, infoType, filters }) => {
  const dispatch = useDispatch()

  const { data, loading, error } = useQuery(GET_ALL_PET_POSTS, {
    variables: {
      input: {
        limit: '3',
        ...filters,
      },
    },
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  })

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
    <div className={`${className}`}>
      {loading && <PulseLoader size={8} />}
      {title && !loading && (
        <h1 className='text-2xl md:text-4xl font-bold mb-8'>{title}</h1>
      )}
      {data?.petPosts?.docs && !loading && (
        <Pets infoType={infoType} posts={data.petPosts} />
      )}
    </div>
  )
}

export default PetDisplay
