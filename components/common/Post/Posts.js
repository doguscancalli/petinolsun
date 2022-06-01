import Post from './Post'

const Posts = ({ posts }) => {
  return (
    <ul className='flex flex-col gap-2'>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  )
}

export default Posts
