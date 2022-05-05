import { forwardRef } from 'react'

const Checkbox = ({ label, htmlFor, ...rest }, ref) => {
  return (
    <div className='inline-block'>
      <input
        type='checkbox'
        className='cursor-pointer opacity-0 absolute peer'
        id={htmlFor}
        ref={ref}
        {...rest}
      />
      <label
        className='cursor-pointer flex items-center before:w-[30px] before:h-[30px] before:rounded-[4px] before:mr-2 before:border before:border-solid before:border-black peer-checked:before:bg-black'
        htmlFor={htmlFor}
      >
        {label}
      </label>
    </div>
  )
}

export default forwardRef((props, ref) => Checkbox(props, ref))
