import { ClientOnly, Sidebar, Topbar } from '@components/shared'
import { Wrapper } from '@components/ui'
import { NextSeo } from 'next-seo'

const AdminLayout = ({ children }) => {
  return (
    <ClientOnly>
      <NextSeo noindex={true} />
      <main className='flex'>
        <Sidebar />
        <Wrapper className='flex-1'>
          <Topbar />
          {children}
        </Wrapper>
      </main>
    </ClientOnly>
  )
}

export default AdminLayout
