import { useEffect } from 'react'
import { FiSettings } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/client'
import { GET_ALL_PET_POSTS, GET_ALL_POSTS } from '@graphql/queries'
import { Avatar, PetDisplay, PostDisplay } from '@components/common'
import Link from 'next/link'
import { PulseLoader } from 'react-spinners'
import { sendToast } from '@features/ui/uiSlice'

const ProfileView = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const {
    data: petPostsData,
    loading: petPostsLoading,
    error: petPostsError,
  } = useQuery(GET_ALL_PET_POSTS, {
    variables: {
      input: {
        limit: '100',
        page: '1',
        user: user?.id,
        postType: 'ADOPTION,OWNERSHIP,LOST,FOUND',
      },
    },
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (petPostsError) {
      petPostsError.graphQLErrors.forEach((error) =>
        dispatch(
          sendToast({
            type: 'error',
            message: error?.extensions?.originalError?.message,
          })
        )
      )
    }
  }, [petPostsError])

  // const {
  //   data: postsData,
  //   loading: postsLoading,
  //   error: postsError,
  // } = useQuery(GET_ALL_POSTS, {
  //   variables: {
  //     input: {
  //       limit: '100',
  //       page: '1',
  //       user: {
  //         _id: user.id,
  //       },
  //     },
  //   },
  //   errorPolicy: 'all',
  //   fetchPolicy: 'no-cache',
  // })

  // useEffect(() => {
  //   if (postsError) {
  //     postsError.graphQLErrors.forEach((error) =>
  //       dispatch(
  //         sendToast({
  //           type: 'error',
  //           message: error?.extensions?.originalError?.message,
  //         })
  //       )
  //     )
  //   }
  // }, [postsError])

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
      {petPostsLoading && <PulseLoader size={8} />}
      {petPostsData?.petPosts && !petPostsLoading && (
        <PetDisplay title='İlanlarım' posts={petPostsData.petPosts} />
      )}
      {/* {postsLoading && <PulseLoader size={8} />} */}
      {/* {postsData?.posts && !postsLoading && ( */}
      <PostDisplay
        className='mt-16'
        title='Gönderilerim'
        filters={{ user: { _id: user.id } }}
      />
      {/* )} */}
    </>
  )
}

export default ProfileView
