import { Button, Modal, Wrapper } from '@components/ui'
import { useState } from 'react'
import { NewPost, PostDisplay } from '@components/common'
import dynamic from 'next/dynamic'
import { ClientOnly } from '@components/shared'

const Navbar = dynamic(() => import('@components/shared/Navbar'), {
  ssr: false,
})

const PostPage = () => {
  const [toggleModal, setToggleModal] = useState(false)

  return (
    <>
      <Wrapper>
        <Navbar />
        <div className='max-w-lg mx-auto mt-16'>
          {toggleModal && (
            <Modal>
              <NewPost setToggleModal={setToggleModal} />
            </Modal>
          )}
          <div className='flex justify-between items-center'>
            <h2 className='text-base md:text-xl font-bold'>Son gönderiler</h2>
            <Button onClick={() => setToggleModal(true)}>Yeni Gönderi</Button>
          </div>
          <ClientOnly>
            <PostDisplay className='mt-6' />
          </ClientOnly>
        </div>
      </Wrapper>
    </>
  )
}

export default PostPage
