import { adminNavLinks } from '@data/links'
import ActiveLink from './ActiveLink'

const Links = () => {
  return (
    <ul className='flex flex-col gap-1 mt-20'>
      {adminNavLinks.map(({ name, url, icon }) => {
        const Icon = icon
        return (
          <li
            key={url}
            className='rounded-xl hover:bg-black hover:text-white transition duration-200 ease-in-out overflow-hidden'
          >
            <ActiveLink activeClassName='bg-black text-white' href={url}>
              <a className='flex gap-4 items-center px-4 py-3 pr-8'>
                <Icon className='text-xl' /> {name}
              </a>
            </ActiveLink>
          </li>
        )
      })}
    </ul>
  )
}

export default Links
