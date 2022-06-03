import dynamic from 'next/dynamic'
import { Footer } from '@components/shared'
import { Wrapper } from '@components/ui'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const DefaultLayout = ({ children }) => {
  return (
    <main>
      <Wrapper>
        <Navbar />
      </Wrapper>
      <div style={{ minHeight: '100vh' }}>{children}</div>
      <Footer />
    </main>
  )
}

export default DefaultLayout
