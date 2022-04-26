import Image from 'next/image'

const Avatar = ({ url, large }) => {
  return (
    <div
      className={`relative rounded-full overflow-hidden ${
        large ? 'w-16 h-16' : 'w-8 h-8'
      }`}
    >
      <Image src={url} alt='Avatar' layout='fill' objectFit='cover' />
    </div>
  )
}

export default Avatar
