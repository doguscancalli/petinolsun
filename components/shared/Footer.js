import { Wrapper } from '@components/ui'
import { ANIMAL, POST_TYPE } from '@data/constants'
import { socialMediaLinks } from '@data/links'
import { objectToArray } from '@utils'
import Link from 'next/link'

const PetPostFooter = ({ postType }) => {
  const animals = objectToArray(ANIMAL)
  return (
    <div className='flex flex-col gap-6 text-center lg:text-left'>
      <Link href={`/ilan/ara?postType=${postType}`} passHref>
        <a className='font-bold text-xl'>{`${POST_TYPE[postType]} ilanları`}</a>
      </Link>
      <ul className='flex flex-col gap-2'>
        {animals.map(({ value }) => (
          <li className='text-black-500 hover:text-black-200' key={value}>
            <Link
              href={`/ilan/ara?postType=${postType}&animal=${value}&page=1`}
            >
              {`${ANIMAL[value]} ${POST_TYPE[postType].toLowerCase()} ilanları`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const postTypes = objectToArray(POST_TYPE)

const Footer = () => {
  return (
    <footer className='bg-black text-white pt-16 pb-4 mt-16 rounded-tl-3xl rounded-tr-3xl'>
      <Wrapper className='flex justify-between flex-col lg:flex-row items-center lg:items-start gap-8'>
        <div className='flex flex-col gap-6 text-center lg:text-left'>
          <Link href='/' passHref>
            <a className='font-bold text-xl'>petinolsun</a>
          </Link>
          <ul className='flex flex-col gap-2'>
            {socialMediaLinks.map(({ name, url }) => (
              <li key={url} className='text-black-500 hover:text-black-200'>
                <a href={url} target='_blank'>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {postTypes.map(({ value }) => (
          <PetPostFooter postType={value} key={value} />
        ))}
      </Wrapper>
      <p className='text-center mt-16 text-black-500'>
        &copy;{` ${new Date().getFullYear()}`} <Link href='/'>petinolsun</Link>
      </p>
    </footer>
  )
}

export default Footer
