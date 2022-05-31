import { POST_TYPE } from '@data/constants'
import { useEffect, useState } from 'react'
import { FiShare2, FiX, FiFacebook, FiTwitter } from 'react-icons/fi'
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa'

const ShareButton = ({ children, ...rest }) => {
  return (
    <button
      className='bg-black text-white p-4 rounded-full hover:opacity-80'
      {...rest}
    >
      {children}
    </button>
  )
}

const ShareButtons = ({ type, postType }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [postUrl, setPostUrl] = useState(undefined)

  useEffect(() => {
    setPostUrl(window.location.href)
  }, [])

  const platforms = [
    {
      value: 'facebook',
      icon: <FiFacebook />,
    },
    {
      value: 'twitter',
      icon: <FiTwitter />,
    },
    {
      value: 'whatsapp',
      icon: <FaWhatsapp />,
    },
    {
      value: 'telegram',
      icon: <FaTelegramPlane />,
    },
  ]

  const facebookShareUrl = (postUrl, content) =>
    `https://www.facebook.com/sharer/sharer.php?u=${postUrl}&quote=${content}`

  const twitterShareUrl = (postUrl, content) =>
    `https://twitter.com/intent/tweet?url=${postUrl}&text=${content}&hashtags=petinolsun`

  const whatsappShareUrl = (postUrl, content) =>
    `https://api.whatsapp.com/send/?text=${content}+${postUrl}&app_absent=0`

  const telegramShareUrl = (postUrl, content) =>
    `https://t.me/share/url?url=${postUrl}&text=${content}`

  const handleContent = (type) => {
    if (type === 'post') {
      return `Bu gönderiye bir göz atın.`
    }
    if (type === 'petPost') {
      return `${POST_TYPE[postType]} ilanına göz atın.`
    }
  }

  const handleShare = (platform) => {
    window
      .open(
        (platform === 'facebook' &&
          facebookShareUrl(postUrl, handleContent(type))) ||
          (platform === 'twitter' &&
            twitterShareUrl(postUrl, handleContent(type))) ||
          (platform === 'whatsapp' &&
            whatsappShareUrl(postUrl, handleContent(type))) ||
          (platform === 'telegram' &&
            telegramShareUrl(postUrl, handleContent(type))),
        'postWindow',
        'width=800,height=800'
      )
      .focus()
  }

  return (
    <div className='relative'>
      <ShareButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiShare2 />}
      </ShareButton>
      {isOpen && (
        <ul className='absolute mt-1 flex flex-col gap-1'>
          {platforms.map(({ value, icon }) => (
            <li key={value}>
              <ShareButton onClick={() => handleShare(value)}>
                {icon}
              </ShareButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ShareButtons
