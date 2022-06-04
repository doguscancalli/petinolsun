import Posts from './Posts'
import { useQuery } from '@apollo/client'
import { GET_ALL_POSTS } from '@graphql/queries'
import { PulseLoader } from 'react-spinners'
import { useEffect, useState } from 'react'
import { Pagination } from '@components/ui'
import { useRouter } from 'next/router'
import { isObjectEmpty } from '@utils'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchData } from '@features/post/postSlice'
import { sendToast } from '@features/ui/uiSlice'

const PostDisplay = ({ className, filters, title, horizontal }) => {
  const [filter, setFilter] = useState('')

  const { searchData } = useSelector((state) => state.post)
  const dispatch = useDispatch()

  const router = useRouter()
  const { query } = useRouter()

  const { data, loading, error, refetch } = useQuery(GET_ALL_POSTS, {
    variables: {
      input: {
        limit: '6',
        ...filter,
        ...filters,
      },
    },
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (data?.posts) {
      dispatch(setSearchData(data?.posts))
    }
  }, [data])

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

  useEffect(() => {
    if (isObjectEmpty(query)) return
    setFilter({ ...filter, ...query })
    refetch()
  }, [query])

  const onPageChange = (event) => {
    const page = Number(event.selected) + 1
    if ((page === 1 && !query?.page) || ~~query?.page === page) return
    router.push({
      query: {
        ...query,
        page,
      },
    })
  }

  return (
    <div className={className}>
      {loading && <PulseLoader size={8} />}
      {title && !loading && (
        <h1 className='text-2xl md:text-4xl font-bold mb-8'>{title}</h1>
      )}
      {searchData?.docs && !loading && (
        <Posts posts={searchData.docs} horizontal={horizontal} />
      )}
      {!horizontal && searchData?.totalPages > 1 && !loading && (
        <Pagination
          className='mt-4 justify-center'
          onPageChange={onPageChange}
          pageCount={searchData.totalPages}
          initialPage={query.page ?? '1'}
        />
      )}
    </div>
  )
}

export default PostDisplay
