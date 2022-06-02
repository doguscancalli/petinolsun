import { Avatar } from '@components/common'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const Moment = dynamic(() => import('react-moment'), {
  ssr: false,
})

const HorizontalPost = ({ post }) => {
  const { id, title, slug, description, user, createdAt } = post
  const router = useRouter()

  return (
    <li
      className='flex flex-col items-start bg-white p-6 rounded-2xl cursor-pointer h-full justify-between'
      onClick={() => router.push(`/gonderi/${slug}`)}
    >
      <p className='break-all'>{description.slice(0, 100)}...</p>
      <div className='flex justify-between items-center w-full mt-8'>
        <div className='flex items-center gap-2'>
          <Avatar
            url={`https://ui-avatars.com/api/?name=${user?.name?.replace(
              /\s+/g,
              '-'
            )}&background=000&color=fff`}
          />
          <p className='text-sm font-bold'>{user?.name}</p>
        </div>
        <p className='text-sm'>
          <Moment locale='tr' fromNow>
            {createdAt}
          </Moment>
        </p>
      </div>
    </li>
  )
}

const VerticalPost = ({ post }) => {
  const { id, title, slug, description, user, createdAt } = post
  const router = useRouter()

  return (
    <li
      className='flex items-start gap-4 bg-white p-4 rounded-2xl cursor-pointer'
      onClick={() => router.push(`/gonderi/${slug}`)}
    >
      <div className='hidden md:block'>
        <Avatar
          url={`https://ui-avatars.com/api/?name=${user?.name?.replace(
            /\s+/g,
            '-'
          )}&background=000&color=fff`}
          large
        />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-bold'>{title}</p>
        <div className='flex gap-2 items-center justify-between md:justify-start'>
          <p className='text-sm font-bold'>{user?.name}</p>
          <p className='hidden md:block text-sm text-black-500'>tarafından</p>
          <p className='text-sm'>
            <Moment locale='tr' fromNow>
              {createdAt}
            </Moment>
          </p>
        </div>
        {/* <div className='flex gap-2'>
        <p className='text-xs'>8 yanıt</p>
        <span className='text-xs text-black-500'>•</span>
        <p className='text-xs'>263 görüntülenme</p>
      </div> */}
      </div>
    </li>
  )
}

const Post = ({ post, horizontal }) => {
  return horizontal ? (
    <HorizontalPost post={post} />
  ) : (
    <VerticalPost post={post} />
  )
}

export default Post
