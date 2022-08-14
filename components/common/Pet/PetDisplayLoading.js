import ContentLoader from 'react-content-loader'

const Skeleton = () => (
  <ContentLoader
    width={368}
    height={552}
    viewBox='0 0 368 552.001'
    backgroundColor='#e8e7e3'
    foregroundColor='#dbdad7'
    style={{ width: '100%' }}
  >
    <path d='M 368.001 552 h -368 V 0 h 368 v 552 z m -66 -28 v 12 h 50 v -12 z m -286 0 v 12 h 100 v -12 z m 0 -36 v 28 h 200 v -28 z' />
  </ContentLoader>
)

const PetDisplayLoading = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4'>
      <div className='rounded-2xl overflow-hidden'>
        <Skeleton />
      </div>
      <div className='rounded-2xl overflow-hidden hidden sm:block'>
        <Skeleton />
      </div>
      <div className='rounded-2xl overflow-hidden hidden lg:block'>
        <Skeleton />
      </div>
      <div className='rounded-2xl overflow-hidden hidden lg:block'>
        <Skeleton />
      </div>
    </div>
  )
}

export default PetDisplayLoading
