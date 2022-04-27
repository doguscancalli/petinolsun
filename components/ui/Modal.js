import { Wrapper } from '@components/ui'

const Modal = ({ children }) => {
  return (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
      <Wrapper>
        <div className='bg-white rounded-2xl p-6 max-w-lg w-full mx-auto'>
          {children}
        </div>
      </Wrapper>
    </div>
  )
}

export default Modal
