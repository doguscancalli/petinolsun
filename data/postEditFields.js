import PostTitle from '@components/common/Post/PostEdit/PostTitle'
import PostDescription from '@components/common/Post/PostEdit/PostDescription'

export default [
  {
    name: 'Başlık',
    component: PostTitle,
    valueType: 'content',
    value: 'title',
  },
  {
    name: 'Açıklama',
    component: PostDescription,
    valueType: 'content',
    value: 'description',
  },
]
