import dynamic from 'next/dynamic'
import { Wrapper, Search } from '@components/ui'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const Hero = () => {
  return (
    <div className='h-[80vh] md:h-[70vh] p-2'>
      <div className='bg-[url("/images/hero-bg.jpg")] bg-cover w-full h-full rounded-3xl'>
        <Wrapper className='flex flex-col h-full items-center'>
          <Navbar className='w-full grow-0' />
          <div className='flex flex-col items-center my-auto'>
            <div className='bg-white rounded-3xl px-4 py-6 md:px-20 md:py-16 mmmmt-24'>
              <h1 className='text-xl md:text-2xl font-bold text-center max-w-xl mb-4 md:mb-8 mx-auto'>
                Çevrendeki sahiplenmeyi bekleyen evcil hayvanları bul
              </h1>
              <Search />
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  )
}

export default Hero
