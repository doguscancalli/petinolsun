const Button = ({ variant, size, children, ...rest }) => {
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
    <button className={`${variant} ${size}`} {...rest}>
      {children}
    </button>
  )
}

export default Button
