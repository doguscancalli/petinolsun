import { FiSettings } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Avatar, PetDisplay, PostDisplay } from '@components/common'
import Link from 'next/link'

const ProfileView = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      <div className='flex flex-col mt-16'>
        <div className='flex gap-4 items-center mx-auto'>
          <Avatar
            url={`https://ui-avatars.com/api/?name=${user?.name?.replace(
              /\s+/g,
              '-'
            )}&background=000&color=fff`}
            large
          />
          <h2 className='text-xl md:text-2xl font-bold'>{user?.name}</h2>
          <Link href='/ayarlar' passHref>
            <a className='cursor-pointer'>
              <FiSettings />
            </a>
          </Link>
        </div>
      </div>
      <PetDisplay
        title='İlanlarım'
        infoType='OWNERSHIP'
        filters={{
          limit: '100',
          postType: 'ADOPTION,OWNERSHIP,LOST,FOUND',
          user: { _id: user.id },
        }}
      />
      <PostDisplay
        className='mt-16'
        title='Gönderilerim'
        filters={{ user: { _id: user.id } }}
      />
    </>
  )
}

export default ProfileView
