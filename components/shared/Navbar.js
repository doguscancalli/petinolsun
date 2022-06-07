import { useState } from 'react'
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'
import { navLinks } from '@data/links'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from 'features/auth/authSlice'
import { Avatar } from '@components/common'
import { FiLogOut } from 'react-icons/fi'

const NavLinks = ({ link, isMobile, toggleMenu, setToggleMenu }) => {
  const handleMenuToggle = () => {
    if (!isMobile) return
    setToggleMenu(!toggleMenu)
  }

  return (
    <li
      className={
        isMobile ? 'mb-2' : `${link.isButton ? 'mr-2' : 'mr-4'} last:mr-0`
      }
    >
      <Link href={link.url} passHref>
        <a
          className={link.isButton && 'btn-primary btn-small inline-block'}
          onClick={handleMenuToggle}
        >
          {link.name}
        </a>
      </Link>
    </li>
  )
}

const UserDisplay = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <div className='flex items-center'>
      <Link href='/profil' passHref>
        <a className='flex items-center gap-2 ml-8'>
          <Avatar
            url={`https://ui-avatars.com/api/?name=${auth?.user?.name.replace(
              /\s+/g,
              '-'
            )}&background=000&color=fff`}
          />
          <p>{auth?.user?.name}</p>
        </a>
      </Link>
      <FiLogOut
        className='ml-4 cursor-pointer'
        onClick={() => dispatch(logout())}
      />
    </div>
  )
}

const Navbar = ({ className }) => {
  const [toggleMenu, setToggleMenu] = useState(false)

  const auth = useSelector((state) => state.auth)

  return (
    <div className='relative w-full'>
      <nav
        className={`bg-white rounded-full flex grow items-center py-2 pl-4 pr-2 md:py-3 md:pl-6 md:pr-3 mt-5 md:mt-8 justify-between ${className}`}
      >
        <Link href='/'>
          <a className='font-bold'>petinolsun</a>
        </Link>
        <ul className='hidden md:flex items-center ml-auto'>
          {navLinks.map((link, index) => {
            if (link.visibility === 'guest' && auth.user) return null
            if (link.visibility === 'user' && !auth.user) return null
            return <NavLinks link={link} key={index} />
          })}
        </ul>
        <div className='hidden md:block'>{auth?.user && <UserDisplay />}</div>
        <button
          className='md:hidden rounded-full bg-black p-[10px]'
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <FiMenu className='text-white' />
        </button>
      </nav>
      {toggleMenu && (
        <ul className='flex flex-col items-center md:hidden bg-black text-white mt-2 rounded-2xl text-center p-6 absolute right-0 left-0 z-50'>
          {navLinks.map((link, index) => {
            if (link.visibility === 'guest' && auth.user) return null
            return (
              <NavLinks
                link={link}
                isMobile={true}
                toggleMenu={toggleMenu}
                setToggleMenu={setToggleMenu}
                key={index}
              />
            )
          })}
          <UserDisplay />
        </ul>
      )}
    </div>
  )
}

export default Navbar
