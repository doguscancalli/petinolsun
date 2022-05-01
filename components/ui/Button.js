import { useState, useEffect } from 'react'
import Link from 'next/link'
import PulseLoader from 'react-spinners/PulseLoader'

const Button = ({
  href,
  external,
  variant,
  size,
  grow,
  block,
  loading,
  disabled,
  children,
  ...rest
}) => {
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

  const externalAtts = external
    ? { target: 'blank', rel: 'noopener noreferrer' }
    : {}

  if (href)
    return (
      <Link href={href} {...rest}>
        <a
          className={`${variant} ${size} ${grow && 'btn-grow'} ${
            block && 'btn-block'
          } ${(disabled || loading) && 'btn-disabled'}`}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          disabled={loading || disabled}
          {...externalAtts}
        >
          {loading ? (
            <div className='w-9 h-6 flex items-center justify-center mx-auto'>
              <PulseLoader color={'#ffffff'} loading={true} size={8} />
            </div>
          ) : (
            childElement
          )}
        </a>
      </Link>
    )

  return (
    <button
      className={`${variant} ${size} ${grow && 'btn-grow'} ${
        block && 'btn-block'
      } ${(disabled || loading) && 'btn-disabled'}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? (
        <div className='w-9 h-6 flex items-center justify-center mx-auto'>
          <PulseLoader color={'#ffffff'} loading={loading} size={8} />
        </div>
      ) : (
        childElement
      )}
    </button>
  )
}

export default Button
