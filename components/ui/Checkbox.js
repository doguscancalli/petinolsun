import { FiCheck } from 'react-icons/fi'

const Checkbox = () => {
  return (
    <div className='inline-block'>
      <input
        type='checkbox'
        className='cursor-pointer opacity-0 absolute peer'
        id='cb1'
      />
      <label
        className='cursor-pointer flex items-center before:w-[30px] before:h-[30px] before:rounded-[4px] before:mr-2 before:border before:border-solid before:border-black peer-checked:before:bg-black'
        for='cb1'
      >
        Normal
      </label>
    </div>
  )
}

export default Checkbox
