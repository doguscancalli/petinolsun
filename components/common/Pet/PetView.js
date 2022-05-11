import { Button } from '@components/ui'
import { useRouter } from 'next/router'
import Moment from 'react-moment'
import 'moment/locale/tr'
import { POST_TYPE, GENDER, AGE } from '@data/constants'
import { useSelector } from 'react-redux'
import Avatar from '../Avatar'
import PetPhotos from './PetPhotos'
import { useEffect, useState } from 'react'

const PetView = ({ post }) => {
  const {
    name,
    postType,
    location,
    age,
    gender,
    description,
    photos,
    contactNumber,
    whatsapp,
    user,
    createdAt,
  } = post

  const { user: authUser } = useSelector((state) => state.auth)

  const router = useRouter()
  const { slug } = router.query

  const [isPostOwner, setIsPostOwner] = useState(null)
  useEffect(() => {
    setIsPostOwner(user?._id === authUser?.id || authUser?.isAdmin)
  }, [])
  useEffect(() => {
    setIsPostOwner(user?._id === authUser?.id || authUser?.isAdmin)
  }, [authUser])

  return (
    <div className='mt-8 grid lg:grid-cols-2 gap-16'>
      <PetPhotos photos={photos} />
      <article>
        <div className='flex justify-between flex-col md:flex-row gap-2 items-center'>
          <div className='flex items-center'>
            <h1 className='text-3xl md:text-4xl font-bold'>{name}</h1>
            <span className='mx-4 text-black-500'>•</span>
            <p className='text-black-500'>{location}</p>
          </div>
        </div>
        {isPostOwner && (
          <div className='my-6'>
            <Button href={`/ilan/duzenle/${slug}`}>İlanı Düzenle</Button>
          </div>
        )}
        <div className='flex gap-2 items-center mt-4'>
          <Avatar
            url={`https://ui-avatars.com/api/?name=${user.name.replace(
              /\s+/g,
              '-'
            )}&background=000&color=fff`}
          />
          <p className='text-sm font-bold'>{user.name}</p>
          <p className='text-sm text-black-500'>tarafından</p>
          <p className='text-sm'>
            <Moment locale='tr' fromNow>
              {createdAt}
            </Moment>
          </p>
        </div>
        <div className='flex gap-2 mt-8 flex-wrap'>
          <Button grow>Soru Sor</Button>
          <Button href={`tel:${contactNumber.replace(/\D+/g, '')}`} grow>
            <span>Ara</span>
            <span>{contactNumber}</span>
          </Button>
          {whatsapp && (
            <Button
              href={`https://wa.me/${contactNumber.replace(/\D+/g, '')}`}
              grow
              external
            >
              Whatsapp
            </Button>
          )}
          <Button grow>Paylaş</Button>
          <Button grow>Şikayet Et</Button>
        </div>
        <div className='mt-8'>
          <div className='flex items-center'>
            <h2 className='text-xl md:text-2xl font-bold'>Detaylar</h2>
            <span className='mx-4 text-black-500'>•</span>
            <p className='text-black-500'>{`${POST_TYPE[postType]}, ${AGE[age]}, ${GENDER[gender]}`}</p>
          </div>
          <p className='mt-4 text-black-500 break-words'>{description}</p>
        </div>
        <div className='mt-16'>
          <h2 className='text-xl md:text-2xl font-bold'>Haritada Gör</h2>
        </div>
      </article>
    </div>
  )
}

export default PetView
