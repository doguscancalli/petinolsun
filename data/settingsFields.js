import UserEmail from '@components/common/Profile/UserEmail'
import UserName from '@components/common/Profile/UserName'
import UserPassword from '@components/common/Profile/UserPassword'

export default [
  {
    name: 'İsim',
    component: UserName,
    valueType: 'content',
    value: 'name',
  },
  {
    name: 'Eposta',
    component: UserEmail,
    valueType: 'content',
    value: 'email',
  },
  {
    name: 'Şifre',
    component: UserPassword,
    valueType: null,
    value: '••••••••',
  },
]
