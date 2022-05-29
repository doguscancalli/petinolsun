import { useEffect } from 'react'
import { FiSettings } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { useQuery } from '@apollo/client'
import { GET_ALL_PET_POSTS } from '@graphql/queries'
import { Avatar, PetDisplay } from '@components/common'
import Link from 'next/link'

const ProfileView = () => {
  const { user } = useSelector((state) => state.auth)

  const { data, loading, error } = useQuery(GET_ALL_PET_POSTS, {
    variables: {
      input: {
        limit: '100',
        page: '1',
        user: user?.id,
      },
    },
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (error) {
      error.graphQLErrors.forEach((error) =>
        dispatch(
          sendToast({
            type: 'error',
            message: error?.extensions?.originalError?.message,
          })
        )
      )
    }
  }, [error])

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
      {data?.petPosts && <PetDisplay title='İlanlarım' posts={data.petPosts} />}
    </>
  )
}

export default ProfileView
