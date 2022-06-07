import { DefaultLayout } from '@components/common'
import { Wrapper } from '@components/ui'

const About = () => {
  return (
    <Wrapper>
      <div className='max-w-lg w-full mx-auto flex flex-col gap-8 mt-8'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl md:text-4xl font-bold'>Hakkımızda</h1>
          <p className='mt-2'>
            Petin Olsun evcil hayvan sahiplenme, sahiplendirme, kayıp ve bulunma
            ilanlarını ücretsiz olarak paylaşabileceğiniz, diğer hayvan
            severlerle fikir alışverişi yapabileceğiniz bir sosyal platformdur.
            Bu platformda hayvan ticareti yapmak, yasaklı ırk ilanı paylaşmak
            kesinlikle yasaktır.
          </p>
          <p>Bize petinolsun@gmail.com adresinden ulaşabilirsiniz.</p>
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl md:text-2xl font-bold'>Kaynaklar</h2>
          <ul className='flex flex-col gap-2'>
            <li>
              <a
                href='https://www.freepik.com/vectors/magic-forest'
                target='_blank'
              >
                Magic forest vector created by upklyak - www.freepik.com
              </a>
            </li>
            <li>
              <a
                href='https://www.freepik.com/vectors/cave-background'
                target='_blank'
              >
                Cave background vector created by upklyak - www.freepik.com
              </a>
            </li>
            <li>
              <a
                href='https://www.freepik.com/vectors/mountain-hiking'
                target='_blank'
              >
                Mountain hiking vector created by upklyak - www.freepik.com
              </a>
            </li>
            <li>
              <a
                href='https://www.freepik.com/vectors/alien-planet'
                target='_blank'
              >
                Alien planet vector created by upklyak - www.freepik.com
              </a>
            </li>
            <li>
              <a
                href='https://www.freepik.com/vectors/waterfall-background'
                target='_blank'
              >
                Waterfall background vector created by upklyak - www.freepik.com
              </a>
            </li>
            <li>
              <a
                href='https://www.freepik.com/vectors/morning-sun'
                target='_blank'
              >
                Morning sun vector created by rawpixel.com - www.freepik.com
              </a>
            </li>
            <li>
              <a
                href='https://www.freepik.com/vectors/server-error'
                target='_blank'
              >
                Server error vector created by storyset - www.freepik.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}

About.Layout = DefaultLayout
export default About
