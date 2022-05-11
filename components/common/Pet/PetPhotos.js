import Image from 'next/image'
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const PetPhotos = ({ photos }) => {
  const swiperOptions = {
    modules: [Pagination, Navigation],
    pagination: { clickable: true },
    navigation: true,
    slidesPerView: 1,
    spaceBetween: 8,
  }

  return (
    <Swiper
      {...swiperOptions}
      className='w-full'
      style={{ aspectRatio: '1 / 1.2' }}
    >
      {photos.map((photo, index) => (
        <SwiperSlide key={index}>
          <Image
            className='rounded-2xl'
            src={photo}
            alt=''
            layout='fill'
            objectFit='cover'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default PetPhotos
