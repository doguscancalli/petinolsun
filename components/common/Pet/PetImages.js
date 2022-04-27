import Image from 'next/image'
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const PetImages = () => {
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
      style={{ aspectRatio: '1 / 1.5' }}
    >
      <SwiperSlide>
        <Image
          className='rounded-2xl'
          src='/images/mountain-illustration.jpg'
          alt=''
          layout='fill'
          objectFit='cover'
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className='rounded-2xl'
          src='/images/mountain-illustration.jpg'
          alt=''
          layout='fill'
          objectFit='cover'
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className='rounded-2xl'
          src='/images/mountain-illustration.jpg'
          alt=''
          layout='fill'
          objectFit='cover'
        />
      </SwiperSlide>
    </Swiper>
  )
}

export default PetImages
