import { useRouter } from 'next/router'
import Image from 'next/image'

const Pet = ({ info, infoType }) => {
  const router = useRouter()

  const handleInfoType = (type, count) => {
    const types = {
      adoption: {
        text: `Sahiplendirilmeyi bekleyen ${count} hayvanı gör`,
        image: '/images/cave-illustration.jpg',
      },
      lost: {
        text: `Bulunmayı bekleyen ${count} hayvanı gör`,
        image: '/images/traveler-illustration.jpg',
      },
      ownership: {
        text: `Sahiplenilmek istenen ${count} hayvanı gör`,
        image: '/images/waterfall-illustration.jpg',
      },
      found: {
        text: `Bulunan ${count} hayvanı gör`,
        image: `/images/waterfall-illustration.jpg`,
      },
    }
    return types[type]
  }

  const mockPet = {
    name: 'Kratos',
    slug: 'kratos',
    location: 'Ankara, Etimesgut',
    image: '/images/waterfall-illustration.jpg',
  }

  {
    if (!info) {
      return (
        <div
          className={`rounded-2xl overflow-hidden cursor-pointer flex items-start relative`}
          style={{ aspectRatio: '1 / 1.5' }}
          onClick={() => router.push(`/ilan/${mockPet.slug}`)}
        >
          <Image
            src={mockPet.image}
            alt=''
            layout='fill'
            objectFit='cover'
            className='-z-10'
          />
          <div className='flex justify-between w-full p-4 bg-gradient-to-t from-black/50 to-black/0 text-white mt-auto z-0'>
            <h2 className='text-base md:text-xl font-bold'>{mockPet.name}</h2>
            <p className='text-black-300'>{mockPet.location}</p>
          </div>
        </div>
      )
    } else {
      return (
        <li
          className={`rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center text-center p-4 relative`}
          style={{ aspectRatio: '1 / 1.5' }}
          onClick={() => router.push('/')}
        >
          <Image
            src={handleInfoType(infoType).image}
            alt=''
            layout='fill'
            objectFit='cover'
            className='-z-10'
          />
          <h2 className='text-xl md:text-2xl font-bold z-0'>
            {handleInfoType(infoType, 842).text}
          </h2>
        </li>
      )
    }
  }
}

export default Pet
