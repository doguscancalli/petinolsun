import { forwardRef } from 'react'

const Input = ({ textarea, disabled, error, errorMessage, ...rest }, ref) => {
  return (
    <div>
      {textarea ? (
        <textarea
          ref={ref}
          className={`input ${disabled && 'input-disabled'} ${
            error && 'input-error'
          } ${textarea && 'input-textarea'}`}
          rows={3}
          disabled={disabled}
          {...rest}
        />
      ) : (
        <input
          ref={ref}
          className={`input ${disabled && 'input-disabled'} ${
            error && 'input-error'
          }`}
          disabled={disabled}
          {...rest}
        />
      )}
      {errorMessage && (
        <p className='text-red text-xs px-6 pt-1'>{errorMessage}</p>
      )}
    </div>
  )
}

export default forwardRef((props, ref) => Input(props, ref))
