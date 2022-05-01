import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button, Input, Wrapper } from '@components/ui'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const ResetPassword = () => {
  const router = useRouter()
  const { token } = router.query

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <Wrapper>
      <Navbar />
      <div className='bg-white max-w-lg w-full mx-auto mt-16 rounded-2xl px-5 md:px-16 py-8'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          Yeni şifreni gir
        </h2>
        <form className='flex flex-col gap-4 mt-16' onSubmit={handleSubmit}>
          <h2 className='text-base md:text-xl font-bold'>Şifre</h2>
          <Input type='password' placeholder='••••••••' />
          <Button>Değiştir</Button>
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

export default ResetPassword
