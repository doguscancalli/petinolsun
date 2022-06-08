import { Avatar } from '@components/common'
import { Button, ShareButtons } from '@components/ui'
import CommentDisplay from './CommentDisplay'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { CREATE_REPORT } from '@graphql/mutations'
import { sendToast } from '@features/ui/uiSlice'
import { ClientOnly } from '@components/shared'

const Moment = dynamic(() => import('react-moment'), {
  ssr: false,
})

const PostView = ({ post }) => {
  const { id, title, slug, description, user, createdAt } = post

  const { user: authUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [isPostOwner, setIsPostOwner] = useState(null)
  useEffect(() => {
    setIsPostOwner(user?._id === authUser?.id || authUser?.isAdmin)
  }, [])

  useEffect(() => {
    setIsPostOwner(user?._id === authUser?.id || authUser?.isAdmin)
  }, [authUser])

  const [createReport, { data, loading }] = useMutation(CREATE_REPORT, {
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
    if (data) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'Rapor oluşturuldu',
        })
      )
    }
  }, [data])

  const handleReport = () => {
    if (!authUser) {
      return dispatch(
        sendToast({
          type: 'error',
          message: 'Rapor oluşturmak için giriş yapmalısınız',
        })
      )
    }
    createReport({
      variables: {
        input: {
          reportedBy: authUser?.id,
          reportedTopic: 'Post',
          reportedTopicId: post?.id,
        },
      },
    })
  }

  return (
    <div className='max-w-lg mx-auto mt-16'>
      <h1 className='text-lg md:text-2xl font-bold'>{title}</h1>
      <div className='flex justify-between md:items-center mt-6 flex-col md:flex-row'>
        <div className='flex gap-4 items-center'>
          <div>
            <div>
              <Avatar
                url={`https://ui-avatars.com/api/?name=${user?.name?.replace(
                  /\s+/g,
                  '-'
                )}&background=000&color=fff`}
                large
              />
            </div>
          </div>
          <div>
            <p className='font-bold'>{user?.name}</p>
            <p className='text-sm text-black-500'>
              <Moment locale='tr' fromNow>
                {createdAt}
              </Moment>
            </p>
          </div>
        </div>
        {/* <div className='text-left md:text-right flex gap-2 md:flex-col md:gap-0 mt-4 md:mt-0'>
          <p className='text-sm text-black-500'>8 yanıt</p>
          <p className='text-sm text-black-500 md:hidden'>•</p>
          <p className='text-sm text-black-500'>263 görüntülenme</p>
        </div> */}
      </div>
      <p className='mt-6 break-words'>{description}</p>
      <div className='flex gap-2 mt-6 flex-wrap'>
        {isPostOwner && (
          <Button href={`/gonderi/duzenle/${slug}`}>Gönderiyi Düzenle</Button>
        )}
        <Button onClick={handleReport} loading={loading}>
          Şikayet Et
        </Button>
        <ShareButtons type='post' />
      </div>
      <ClientOnly>
        <CommentDisplay className='mt-16' id={id} />
      </ClientOnly>
    </div>
  )
}

export default PostView
