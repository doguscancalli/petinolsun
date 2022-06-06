import { Button, Modal, Wrapper } from '@components/ui'
import { useState } from 'react'
import { DefaultLayout, NewPost, PostDisplay } from '@components/common'
import { ClientOnly } from '@components/shared'
import { NextSeo } from 'next-seo'

const PostPage = () => {
  const [toggleModal, setToggleModal] = useState(false)

  return (
    <Wrapper>
      <NextSeo title='Gönderiler' />
      <div className='max-w-lg mx-auto mt-16'>
        {toggleModal && (
          <Modal>
            <NewPost setToggleModal={setToggleModal} />
          </Modal>
        )}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl md:text-4xl font-bold'>Son gönderiler</h1>
          <Button onClick={() => setToggleModal(true)}>Yeni Gönderi</Button>
        </div>
        <ClientOnly>
          <PostDisplay className='mt-6' />
        </ClientOnly>
      </div>
    </Wrapper>
  )
}

PostPage.Layout = DefaultLayout
export default PostPage
