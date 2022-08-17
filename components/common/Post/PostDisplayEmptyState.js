import Image from 'next/image'
import { Button } from '@components/ui'

const PostDisplayEmptyState = ({ title }) => {
  return (
    <div className='flex flex-col'>
      {title && (
        <h1 className='text-2xl md:text-4xl font-bold mb-8'>{title}</h1>
      )}
      <div
        className='relative place-self-center max-w-[200px] lg:max-w-[300px] w-full'
        style={{ aspectRatio: '1/.6' }}
      >
        <Image
          src='/images/sleeping-panda.svg'
          alt=''
          layout='fill'
          objectFit='contain'
        />
      </div>
      <div className='flex flex-col gap-4 items-center text-center mt-6'>
        <h2>Gönderi bulamadık, yeni oluşturmak ister misin?</h2>
        <Button href='/gonderi#new'>Yeni Gönderi Oluştur</Button>
      </div>
    </div>
  )
}

export default PostDisplayEmptyState
