import Pet from './Pet'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const Pets = ({ infoType }) => {
  const swiperOptions = {
    slidesPerView: 1.2,
    spaceBetween: 8,
    breakpoints: {
      640: {
        slidesPerView: 2.2,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  }

  return (
    <Swiper {...swiperOptions}>
      <SwiperSlide>
        <Pet />
      </SwiperSlide>
      <SwiperSlide>
        <Pet />
      </SwiperSlide>
      <SwiperSlide>
        <Pet />
      </SwiperSlide>
      <SwiperSlide>
        <Pet info infoType={infoType} />
      </SwiperSlide>
    </Swiper>
  )
}

export default Pets
