import { forwardRef } from 'react'
import { FiChevronDown } from 'react-icons/fi'

const Select = ({ options, ...rest }, ref) => {
  return (
    <div className='relative'>
      <select
        className='border border-black rounded-full px-6 py-3 w-full outline-none appearance-none'
        ref={ref}
        {...rest}
      >
        {options.map(({ name, value }) => (
          <option value={value} key={value}>
            {name}
          </option>
        ))}
      </select>
      <FiChevronDown className='absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none' />
    </div>
  )
}

export default forwardRef((props, ref) => Select(props, ref))
