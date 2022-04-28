import Link from 'next/link'
import { useState, useEffect } from 'react'

const Button = ({ href, variant, size, grow, block, children, ...rest }) => {
  const isObject = typeof children === 'object'
  const [childElement, setChildElement] = useState(
    isObject ? children[0] : children
  )

  useEffect(() => {
    setChildElement(isObject ? children[0] : children)
  }, [children])

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

  const handleHover = (e) => {
    if (!isObject) return
    if (e.type === 'mouseenter') {
      setChildElement(children[1])
    }
    if (e.type === 'mouseleave') {
      setChildElement(children[0])
    }
  }

  if (href)
    return (
      <Link
        href={href}
        {...rest}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <a
          className={`${variant} ${size} ${grow && 'btn-grow'} ${
            block && 'btn-block'
          }`}
        >
          {childElement}
        </a>
      </Link>
    )

  return (
    <button
      className={`${variant} ${size} ${grow && 'btn-grow'} ${
        block && 'btn-block'
      }`}
      {...rest}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      {childElement}
    </button>
  )
}

export default Button
