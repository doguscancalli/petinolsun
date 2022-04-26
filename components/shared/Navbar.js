import { useState } from 'react'
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'

import { navLinks } from '@data/links'

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

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <>
      <nav className='bg-white rounded-full flex grow items-center justify-between py-2 pl-4 pr-2 sm:py-3 sm:pl-6 sm:pr-3 mt-5 md:mt-8'>
        <Link href='/'>
          <a className='font-bold'>petinolsun</a>
        </Link>
        <ul className='hidden sm:flex items-center'>
          {navLinks.map((link, index) => (
            <NavLinks link={link} key={index} />
          ))}
        </ul>
        <button
          className='sm:hidden rounded-full bg-black p-[10px]'
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <FiMenu className='text-white' />
        </button>
      </nav>
      {toggleMenu && (
        <ul className='block sm:hidden bg-white mt-2 rounded-2xl text-center p-6'>
          {navLinks.map((link, index) => (
            <NavLinks
              link={link}
              isMobile={true}
              toggleMenu={toggleMenu}
              setToggleMenu={setToggleMenu}
              key={index}
            />
          ))}
        </ul>
      )}
    </>
  )
}

export default Navbar
