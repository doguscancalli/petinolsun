const Radio = ({ label, htmlFor, ...rest }) => {
  return (
    <div className='inline-block'>
      <input
        type='radio'
        className='cursor-pointer opacity-0 absolute peer'
        id={htmlFor}
        {...rest}
      />
      <label
        className='cursor-pointer flex items-center before:w-[30px] before:h-[30px] before:rounded-full before:mr-2 before:border before:border-solid before:border-black peer-checked:before:bg-black'
        htmlFor={htmlFor}
      >
        {label}
      </label>
    </div>
  )
}

export default Radio
