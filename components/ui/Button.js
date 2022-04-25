const Button = ({ variant, size, grow, block, children, ...rest }) => {
  switch (variant) {
    case 'secondary':
      variant = 'btn-secondary'
      break
    default:
      variant = 'btn-primary'
      break
  }

  switch (size) {
    case 'small':
      size = 'btn-small'
      break

    default:
      size = 'btn-large'
      break
  }

  return (
    <button
      className={`${variant} ${size} ${grow && 'btn-grow'} ${
        block && 'btn-block'
      }`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
