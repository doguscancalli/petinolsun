import Pet from './Pet'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const Pets = ({ infoType, posts }) => {
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
      {posts.docs.map((post) => (
        <SwiperSlide key={post.id}>
          <Pet post={post} />
        </SwiperSlide>
      ))}
      {posts.docs.length === 3 && (
        <SwiperSlide>
          <Pet info infoType={infoType} totalDocs={posts.totalDocs} />
        </SwiperSlide>
      )}
    </Swiper>
  )
}

export default Pets
