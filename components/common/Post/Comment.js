import { useMutation } from '@apollo/client'
import { Avatar } from '@components/common'
import { removeSearchData } from '@features/comment/commentSlice'
import { sendToast } from '@features/ui/uiSlice'
import { DELETE_COMMENT } from '@graphql/mutations'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'

const Moment = dynamic(() => import('react-moment'), {
  ssr: false,
})

const Comment = ({ comment }) => {
  const { id, comment: commentText, user, createdAt } = comment

  const { user: authUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [isCommentOwner, setIsCommentOwner] = useState(null)
  useEffect(() => {
    setIsCommentOwner(user?._id === authUser?.id || authUser?.isAdmin)
  }, [])

  const [deleteComment, { data: deletedData, loading, error }] = useMutation(
    DELETE_COMMENT,
    {
      errorPolicy: 'all',
    }
  )

  useEffect(() => {
    if (deletedData) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'Yorum başarıyla silindi',
        })
      )
      dispatch(removeSearchData(id))
    }
  }, [deletedData])

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

  const handleDelete = () => {
    var result = confirm('Yorumunuzu silmek istediğinize emin misiniz?')
    if (result) {
      deleteComment({
        variables: {
          id,
        },
      })
    }
  }

  return (
    <li className='relative bg-white p-4 rounded-lg'>
      {isCommentOwner && (
        <button
          className='bg-black text-white absolute -top-1 -right-1 z-10 rounded-full p-2'
          onClick={handleDelete}
          disabled={loading}
        >
          <FiX />
        </button>
      )}
      <div className='flex gap-4 items-center'>
        <div>
          <Avatar
            url={`https://ui-avatars.com/api/?name=${user?.name?.replace(
              /\s+/g,
              '-'
            )}&background=000&color=fff`}
          />
        </div>
        <div>
          <p className='font-bold'>{user?.name}</p>
          <p className='text-xs text-black-500'>
            <Moment locale='tr' fromNow>
              {createdAt}
            </Moment>
          </p>
        </div>
      </div>
      <p className='mt-3'>{commentText}</p>
    </li>
  )
}

export default Comment
