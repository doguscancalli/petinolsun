import { Wrapper } from '@components/ui'
import Pets from './Pets'

const PetDisplay = ({ title, infoType }) => {
  return (
    <div className='mt-16'>
      <Wrapper>
        <h1 className='text-2xl md:text-4xl font-bold mb-8'>{title}</h1>
        <Pets infoType={infoType} />
      </Wrapper>
    </div>
  )
}

export default PetDisplay
