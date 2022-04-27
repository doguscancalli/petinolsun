import PostState from '@components/common/Pet/PetEdit/PostState'
import PostLocation from '@components/common/Pet/PetEdit/PostLocation'
import PostPet from '@components/common/Pet/PetEdit/PostPet'
import PostAge from '@components/common/Pet/PetEdit/PostAge'
import PostGender from '@components/common/Pet/PetEdit/PostGender'
import PostDetails from '@components/common/Pet/PetEdit/PostDetails'
import PostContactInfo from '@components/common/Pet/PetEdit/PostContactInfo'
import PostPhotos from '@components/common/Pet/PetEdit/PostPhotos'

export default [
  {
    name: 'İlan durumu',
    component: PostState,
    content: 'Sahiplendirilmeyi bekliyor',
  },
  {
    name: 'Lokasyon bilgisi',
    component: PostLocation,
    content: 'Ankara, Etimesgut',
  },
  {
    name: 'Hayvan',
    component: PostPet,
    content: 'Ankara, Etimesgut',
  },
  {
    name: 'Yaş',
    component: PostAge,
    content: 'Yavru',
  },
  {
    name: 'Cinsiyet',
    component: PostGender,
    content: 'Erkek',
  },
  {
    name: 'Detaylar',
    component: PostDetails,
    content: 'Zombie ipsum reversus ab viral inferno...',
  },
  {
    name: 'İletişim',
    component: PostContactInfo,
    content: '555 555 55 55',
  },
  {
    name: 'Fotoğraflar',
    component: PostPhotos,
    content: [
      '/images/mountain-illustration.jpg',
      '/images/traveler-illustration.jpg',
      '/images/waterfall-illustration.jpg',
      '/images/alien-planet-illustration.jpg',
      '/images/cave-illustration.jpg',
    ],
  },
]
