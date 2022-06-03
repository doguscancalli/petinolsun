import { useDispatch, useSelector } from 'react-redux'
import { FiMenu } from 'react-icons/fi'
import { toggleSidebar } from '@features/ui/uiSlice'

const Topbar = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <header className='flex items-center'>
      <button
        className='mr-4 md:hidden text-xl'
        onClick={() => dispatch(toggleSidebar())}
      >
        <FiMenu />
      </button>
      <h2 className='text-2xl md:text-4xl font-bold py-6'>
        Hoşgeldin, {user?.name?.split(' ')[0]}
      </h2>
    </header>
  )
}

export default Topbar
