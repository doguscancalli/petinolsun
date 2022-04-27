import ContactInfo from '@components/common/Pet/PetForm/ContactInfo'
import Location from '@components/common/Pet/PetForm/Location'
import PetDetails from '@components/common/Pet/PetForm/PetDetails'
import PetPhotos from '@components/common/Pet/PetForm/PetPhotos'
import PostDetails from '@components/common/Pet/PetForm/PostDetails'

export default {
  adoption: [
    {
      name: 'Location',
      component: Location,
      form: {
        location: 'Hangi lokasyonda sahiplendirmek istiyorsunuz?',
      },
    },
    {
      name: 'PetDetails',
      component: PetDetails,
      form: {
        pet: 'Sahiplendirmek istediğiniz hayvan nedir?',
        age: 'Kaç yaşında?',
        gender: 'Cinsiyeti nedir?',
      },
    },
    {
      name: 'PostDetails',
      component: PostDetails,
    },
    {
      name: 'PetPhotos',
      component: PetPhotos,
    },
    {
      name: 'ContactInfo',
      component: ContactInfo,
    },
  ],
  ownership: [
    {
      name: 'Location',
      component: Location,
      form: {
        location: 'Hangi lokasyonda sahiplenmek istiyorsunuz?',
      },
    },
    {
      name: 'PetDetails',
      component: PetDetails,
      form: {
        pet: 'Sahiplenmek istediğiniz hayvan nedir?',
        age: 'Kaç yaşında olsun?',
        gender: 'Cinsiyeti ne olsun?',
      },
    },
    {
      name: 'PostDetails',
      component: PostDetails,
    },
    {
      name: 'ContactInfo',
      component: ContactInfo,
    },
  ],
  lost: [
    {
      name: 'Location',
      component: Location,
      form: {
        location: 'Kaybolduğu lokasyonu seçin',
      },
    },
    {
      name: 'PetDetails',
      component: PetDetails,
      form: {
        pet: 'Kaybolan hayvanınız nedir?',
        age: 'Kaç yaşındaydı?',
        gender: 'Cinsiyeti neydi?',
      },
    },
    {
      name: 'PostDetails',
      component: PostDetails,
    },
    {
      name: 'PetPhotos',
      component: PetPhotos,
    },
    {
      name: 'ContactInfo',
      component: ContactInfo,
    },
  ],
  found: [
    {
      name: 'Location',
      component: Location,
      form: {
        location: 'Bulduğunuz lokasyonu seçin',
      },
    },
    {
      name: 'PetDetails',
      component: PetDetails,
      form: {
        pet: 'Bulduğunuz hayvan nedir?',
        age: 'Kaç yaşında?',
        gender: 'Cinsiyeti nedir?',
      },
    },
    {
      name: 'PostDetails',
      component: PostDetails,
    },
    {
      name: 'PetPhotos',
      component: PetPhotos,
    },
    {
      name: 'ContactInfo',
      component: ContactInfo,
    },
  ],
}
