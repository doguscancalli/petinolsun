import { Button } from '@components/ui'
import Image from 'next/image'

const PetPostSearchViewEmptyState = () => {
  return (
    <div className='flex flex-col mt-6'>
      <div
        className='relative place-self-center max-w-[200px] lg:max-w-[300px] w-full'
        style={{ aspectRatio: '1/.6' }}
      >
        <Image
          src='/images/sleeping-cat-2.svg'
          alt=''
          layout='fill'
          objectFit='contain'
        />
      </div>
      <div className='flex flex-col gap-4 items-center text-center mt-6'>
        <h2>İlan bulamadık, yeni oluşturmak ister misin?</h2>
        <Button href='/ilan/yeni'>Yeni İlan Oluştur</Button>
      </div>
    </div>
  )
}

export default PetPostSearchViewEmptyState
