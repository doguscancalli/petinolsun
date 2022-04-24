const Input = ({ textarea, disabled, error, errorMessage, ...rest }) => {
  return (
    <>
      {textarea ? (
        <textarea
          className={`input ${disabled && 'input-disabled'} ${
            error && 'input-error'
          } ${textarea && 'input-textarea'}`}
          rows={3}
          disabled={disabled}
          {...rest}
        />
      ) : (
        <input
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
    </>
  )
}

export default Input
