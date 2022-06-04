import { toggleSidebar } from '@features/ui/uiSlice'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { FiMenu } from 'react-icons/fi'
import Links from './Links'
import UserDisplay from './UserDisplay'

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  return (
    <aside
      className={`flex flex-col h-screen py-6 px-8 fixed md:sticky top-0 -translate-x-full md:translate-x-0 transition ease-in-out duration-500 bg-black-50 md:bg-transparent z-50 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='flex justify-between items-center'>
        <Link href='/admin' passHref>
          <a className='font-bold text-lg px-4'>petinolsun</a>
        </Link>
        <button
          className='md:hidden text-xl'
          onClick={() => dispatch(toggleSidebar())}
        >
          <FiMenu />
        </button>
      </div>
      <Links />
      <UserDisplay className='mt-auto' />
    </aside>
  )
}

export default Sidebar
