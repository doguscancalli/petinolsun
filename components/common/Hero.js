import { Navbar } from '@components/shared'
import { Wrapper, Search } from '@components/ui'

const Hero = () => {
  return (
    <div className='h-[70vh] p-2'>
      <div className='bg-[url("/images/hero-bg.jpg")] bg-cover w-full h-full rounded-3xl overflow-auto'>
        <Wrapper>
          <Navbar />
          <div className='flex flex-col items-center'>
            <div className='bg-white rounded-3xl px-4 py-6 md:px-20 md:py-16 mt-24'>
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
