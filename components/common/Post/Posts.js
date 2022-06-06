import Image from 'next/image'
import Post from './Post'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useRouter } from 'next/router'

const HorizontalPost = ({ posts, horizontal }) => {
  const router = useRouter()

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
      {posts?.map((post) => (
        <SwiperSlide key={post.id} style={{ height: 'auto' }}>
          <Post post={post} horizontal={horizontal} />
        </SwiperSlide>
      ))}
      {posts?.length >= 3 && (
        <SwiperSlide style={{ height: 'auto' }}>
          <li
            className='relative rounded-2xl cursor-pointer overflow-hidden h-full flex items-center justify-center'
            onClick={() => router.push(`/gonderi`)}
          >
            <Image
              src={'/images/alien-planet-illustration.jpg'}
              alt=''
              layout='fill'
              objectFit='cover'
              className='-z-10'
            />
            <h2 className='text-xl md:text-2xl font-bold z-0 text-white'>
              Diğer gönderileri gör
            </h2>
          </li>
        </SwiperSlide>
      )}
    </Swiper>
  )
}

const VerticalPost = ({ posts, horizontal }) => {
  return (
    <ul className='flex gap-2 flex-col'>
      {posts?.map((post) => (
        <Post key={post.id} post={post} horizontal={horizontal} />
      ))}
    </ul>
  )
}

const Posts = ({ posts, horizontal }) => {
  return horizontal ? (
    <HorizontalPost posts={posts} horizontal={horizontal} />
  ) : (
    <VerticalPost posts={posts} horizontal={horizontal} />
  )
}

export default Posts
