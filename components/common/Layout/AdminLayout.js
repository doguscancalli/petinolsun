import { ClientOnly, Sidebar, Topbar } from '@components/shared'
import { Wrapper } from '@components/ui'

const DefaultLayout = ({ children }) => {
  return (
    <ClientOnly>
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

export default DefaultLayout
