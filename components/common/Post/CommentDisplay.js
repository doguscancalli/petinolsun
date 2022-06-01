import { Button, Modal } from '@components/ui'
import { useEffect, useState } from 'react'
import Comments from './Comments'
import NewComment from './NewComment'
import { Pagination } from '@components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { isObjectEmpty } from '@utils'
import { GET_ALL_COMMENTS } from '@graphql/queries'
import { sendToast } from '@features/ui/uiSlice'
import { setSearchData } from '@features/comment/commentSlice'
import { PulseLoader } from 'react-spinners'

const CommentDisplay = ({ className, id }) => {
  const [toggleModal, setToggleModal] = useState(false)
  const [filter, setFilter] = useState({ post: id })

  const { searchData } = useSelector((state) => state.comment)
  const dispatch = useDispatch()

  const router = useRouter()
  const { query } = useRouter()

  const { data, loading, error, refetch } = useQuery(GET_ALL_COMMENTS, {
    variables: {
      input: {
        limit: '12',
        ...filter,
      },
    },
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (data?.comments) {
      dispatch(setSearchData(data?.comments))
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
    setFilter({ ...filter, page: query?.page })
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
    <div className={`${className}`}>
      {toggleModal && (
        <Modal>
          <NewComment setToggleModal={setToggleModal} id={id} />
        </Modal>
      )}
      <div className='flex items-center justify-between'>
        <h2 className='text-base md:text-xl font-bold'>Yorumlar</h2>
        <Button onClick={() => setToggleModal(true)}>Yeni Yorum</Button>
      </div>
      {loading && <PulseLoader size={8} />}
      {searchData && !loading && (
        <Comments className='mt-4' comments={searchData.docs} />
      )}
      {searchData?.totalPages > 1 && !loading && (
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

export default CommentDisplay
