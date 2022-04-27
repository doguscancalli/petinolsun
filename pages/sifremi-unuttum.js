import Link from 'next/link'

import { Navbar } from '@components/shared'
import { Button, Checkbox, Input, Wrapper } from '@components/ui'

const LostPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <Wrapper>
      <Navbar />
      <div className='bg-white max-w-lg w-full mx-auto mt-16 rounded-2xl px-5 md:px-16 py-8'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          Şifreni sıfırla
        </h2>
        <form className='flex flex-col gap-4 mt-16' onSubmit={handleSubmit}>
          <h2 className='text-base md:text-xl font-bold'>Eposta</h2>
          <Input type='email' placeholder='mail@mail.com' />
          <Button>Sıfırla</Button>
        </form>
        <p className='mt-4 text-center'>
          <Link href='/giris' passHref>
            <a className='underline'>Giriş ekranına dön</a>
          </Link>
        </p>
      </div>
    </Wrapper>
  )
}

export default LostPassword
