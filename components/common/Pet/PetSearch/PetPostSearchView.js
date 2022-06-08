import { Pagination } from '@components/ui'
import Pet from '../Pet'
import SearchNav from './SearchNav'
import { useQuery } from '@apollo/client'
import { GET_ALL_PET_POSTS } from '@graphql/queries'
import { useSelector, useDispatch } from 'react-redux'
import { sendToast } from '@features/ui/uiSlice'
import { setSearchData } from '@features/petPost/petPostSlice'
import { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import { isObjectEmpty } from '@utils'

const PetPostSearchView = () => {
  const [filter, setFilter] = useState({
    postType: 'ADOPTION',
  })

  const { searchData } = useSelector((state) => state.petPost)
  const dispatch = useDispatch()

  const router = useRouter()
  const { query } = useRouter()

  const { data, loading, refetch } = useQuery(GET_ALL_PET_POSTS, {
    variables: {
      input: {
        limit: '12',
        listing: true,
        ...filter,
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

  useEffect(() => {
    if (data?.petPosts) {
      dispatch(setSearchData(data?.petPosts))
    }
  }, [data])

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
    <div>
      <SearchNav />
      {loading && <PulseLoader size={8} />}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8'>
        {searchData &&
          !loading &&
          searchData?.docs?.map((post) => <Pet key={post.id} post={post} />)}
      </div>
      {searchData?.totalPages > 1 && !loading && (
        <Pagination
          className='mt-8 justify-center'
          onPageChange={onPageChange}
          pageCount={searchData?.totalPages}
          initialPage={query.page ?? '1'}
        />
      )}
    </div>
  )
}

export default PetPostSearchView
