import { Footer } from '@components/shared'

const HomeLayout = ({ children }) => {
  return (
    <main>
      <div style={{ minHeight: '100vh' }}>{children}</div>
      <Footer />
    </main>
  )
}

export default HomeLayout
