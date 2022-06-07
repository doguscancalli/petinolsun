export const navLinks = [
  {
    name: 'İlanlar',
    url: '/ilan/ara',
  },
  {
    name: 'Yeni İlan',
    url: '/ilan/yeni',
  },
  {
    name: 'Gönderiler',
    url: '/gonderi',
  },
  {
    name: 'Hakkımızda',
    url: '/hakkimizda',
  },
  {
    name: 'Kaydol',
    url: '/kaydol',
    isButton: true,
    visibility: 'guest',
  },
  {
    name: 'Giriş Yap',
    url: '/giris',
    isButton: true,
    visibility: 'guest',
  },
]

export const socialMediaLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/petinolsun',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/petinolsun',
  },
]

import {
  FiGrid,
  FiUsers,
  FiColumns,
  FiSquare,
  FiClipboard,
  FiSettings,
} from 'react-icons/fi'

export const adminNavLinks = [
  {
    name: 'Genel',
    url: '/admin',
    icon: FiGrid,
  },
  // {
  //   name: 'İlanlar',
  //   url: '/admin/ilan',
  //   icon: FiColumns,
  // },
  // {
  //   name: 'Gönderiler',
  //   url: '/admin/gonderi',
  //   icon: FiSquare,
  // },
  {
    name: 'Kullanıcılar',
    url: '/admin/kullanici',
    icon: FiUsers,
  },
  {
    name: 'Raporlar',
    url: '/admin/rapor',
    icon: FiClipboard,
  },
  {
    name: 'Ayarlar',
    url: '/admin/ayarlar',
    icon: FiSettings,
  },
]
