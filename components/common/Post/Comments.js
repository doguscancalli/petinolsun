import Comment from './Comment'

const Comments = ({ className, comments }) => {
  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  )
}

export default Comments
