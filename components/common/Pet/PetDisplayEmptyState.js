import Image from 'next/image'
import { Button } from '@components/ui'

const PetDisplayEmptyState = ({ title, infoType }) => {
  return (
    <div className='flex flex-col'>
      {title && (
        <h1 className='text-2xl md:text-4xl font-bold mb-8'>{title}</h1>
      )}
      <div
        className='relative place-self-center max-w-[200px] lg:max-w-[300px] w-full'
        style={{ aspectRatio: '1/.6' }}
      >
        {infoType === 'ADOPTION' && (
          <Image
            src='/images/sleeping-cat.svg'
            alt=''
            layout='fill'
            objectFit='contain'
          />
        )}
        {infoType === 'LOST' && (
          <Image
            src='/images/sleeping-dog.svg'
            alt=''
            layout='fill'
            objectFit='contain'
          />
        )}
        {infoType === 'OWNERSHIP' && (
          <Image
            src='/images/sleeping-koala.svg'
            alt=''
            layout='fill'
            objectFit='contain'
          />
        )}
        {infoType === 'FOUND' && (
          <Image
            src='/images/sleeping-elephant.svg'
            alt=''
            layout='fill'
            objectFit='contain'
          />
        )}
      </div>
      <div className='flex flex-col gap-4 items-center text-center mt-6'>
        <h2>İlan bulamadık, yeni oluşturmak ister misin?</h2>
        <Button href='/ilan/yeni'>Yeni İlan Oluştur</Button>
      </div>
    </div>
  )
}

export default PetDisplayEmptyState
