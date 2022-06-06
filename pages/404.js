import { Button } from '@components/ui'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

const NotFound = () => {
  return (
    <div className='flex items-center justify-center flex-col h-screen'>
      <NextSeo title='404' />
      <div
        className='relative max-w-xs sm:max-w-sm w-full'
        style={{ aspectRatio: '1/1' }}
      >
        <Image
          src='/images/not-found-illustration.svg'
          alt='Sayfa Bulunamadı'
          layout='fill'
          objectFit='contain'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl md:text-3xl font-bold'>Sayfa bulunamadı</h2>
        <Button href='/'>Anasayfaya Dön</Button>
      </div>
    </div>
  )
}

export default NotFound
