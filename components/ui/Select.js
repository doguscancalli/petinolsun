import { FiChevronDown } from 'react-icons/fi'

const Select = () => {
  return (
    <div className='relative'>
      <select className='border border-black rounded-full px-6 py-3 w-full outline-none appearance-none'>
        <option value='first'>first</option>
        <option value='second'>second</option>
        <option value='third'>third</option>
      </select>
      <FiChevronDown className='absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none' />
    </div>
  )
}

export default Select
