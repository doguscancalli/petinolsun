import { useQuery } from '@apollo/client'
import { sendToast } from '@features/ui/uiSlice'
import { GET_COUNTS } from '@graphql/queries'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PulseLoader } from 'react-spinners'
import StatsCard from './StatsCard'

const StatCards = () => {
  const dispatch = useDispatch()

  const { data, loading, error } = useQuery(GET_COUNTS, {
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
    <ul className='flex gap-4 flex-wrap'>
      {loading && <PulseLoader size={8} />}
      {data?.counts?.counts?.map((item) => (
        <StatsCard title={item.title} count={item.count} key={item.title} />
      ))}
    </ul>
  )
}

export default StatCards
