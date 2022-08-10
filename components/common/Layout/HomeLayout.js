import { Footer } from '@components/shared'
import Head from 'next/head'

const HomeLayout = ({ children }) => {
  return (
    <>
      <Head>
        <meta
          name='google-site-verification'
          content='jbM4z371-TE5qzQwLvzSTfju_IIQ-o0dryQgQyUdDkw'
        />
      </Head>
      <main>
        <div style={{ minHeight: '100vh' }}>{children}</div>
        <Footer />
      </main>
    </>
  )
}

export default HomeLayout
