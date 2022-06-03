import { logout } from '@features/auth/authSlice'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { FiLogOut } from 'react-icons/fi'
import { Avatar } from '@components/common'

const UserDisplay = ({ className }) => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <div className={`${className}`}>
      <Link href='/profil' passHref>
        <a className='flex items-center gap-2'>
          <Avatar
            url={`https://ui-avatars.com/api/?name=${user?.name.replace(
              /\s+/g,
              '-'
            )}&background=000&color=fff`}
          />
          <p>{user?.name}</p>
        </a>
      </Link>
      <button className='flex gap-4 items-center mt-4 cursor-pointer w-full p-1'>
        <FiLogOut className='text-xl' onClick={() => dispatch(logout())} />
        <span>Çıkış</span>
      </button>
    </div>
  )
}

export default UserDisplay
