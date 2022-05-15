import PostState from '@components/common/Pet/PetEdit/PostState'
import PostLocation from '@components/common/Pet/PetEdit/PostLocation'
import PostPet from '@components/common/Pet/PetEdit/PostPet'
import PostAge from '@components/common/Pet/PetEdit/PostAge'
import PostGender from '@components/common/Pet/PetEdit/PostGender'
import PostDetails from '@components/common/Pet/PetEdit/PostDetails'
import PostContactInfo from '@components/common/Pet/PetEdit/PostContactInfo'
import PostPhotos from '@components/common/Pet/PetEdit/PostPhotos'
import PostName from '@components/common/Pet/PetEdit/PostName'
import PostWhatsapp from '@components/common/Pet/PetEdit/PostWhatsapp'
import { AGE, ANIMAL, GENDER, PET_POST_STATE } from './constants'

export default [
  {
    name: 'İlan durumu',
    component: PostState,
    valueType: 'constant',
    value: 'listing',
    constant: PET_POST_STATE,
  },
  {
    name: 'İsim/Başlık',
    component: PostName,
    valueType: 'content',
    value: 'name',
  },
  {
    name: 'Lokasyon bilgisi',
    component: PostLocation,
    content: 'Ankara, Etimesgut',
    valueType: 'content',
    value: 'location',
  },
  {
    name: 'Hayvan',
    component: PostPet,
    valueType: 'constant',
    value: 'animal',
    constant: ANIMAL,
  },
  {
    name: 'Yaş',
    component: PostAge,
    valueType: 'constant',
    value: 'age',
    constant: AGE,
  },
  {
    name: 'Cinsiyet',
    component: PostGender,
    valueType: 'constant',
    value: 'gender',
    constant: GENDER,
  },
  {
    name: 'Açıklama',
    component: PostDetails,
    valueType: 'content',
    value: 'description',
  },
  {
    name: 'İletişim',
    component: PostContactInfo,
    valueType: 'content',
    value: 'contactNumber',
  },
  {
    name: 'Whatsapp',
    component: PostWhatsapp,
    valueType: 'constant',
    value: 'whatsapp',
    constant: PET_POST_STATE,
  },
  {
    name: 'Fotoğraflar',
    component: PostPhotos,
    valueType: 'photo',
    value: 'photos',
  },
]
