import { useRef } from 'react'
import { useRouter, withRouter } from 'next/router'
import Image from 'next/image'
import Moment from 'react-moment'
import 'moment/locale/tr'

const Pet = ({ info, infoType, post, totalDocs }) => {
  const { slug, name, city, district, photos, createdAt } = post || {}

  const nameParentRef = useRef(null)
  const nameRef = useRef(null)

  const router = useRouter()

  const handleInfoType = (type, count) => {
    const types = {
      ADOPTION: {
        text: `Sahiplendirilmeyi bekleyen ${count} hayvanı gör`,
        image: '/images/cave-illustration.jpg',
        url: '/ilan/ara?postType=ADOPTION&page=1',
      },
      LOST: {
        text: `Bulunmayı bekleyen ${count} hayvanı gör`,
        image: '/images/traveler-illustration.jpg',
        url: '/ilan/ara?postType=LOST&page=1',
      },
      OWNERSHIP: {
        text: `Sahiplenilmek istenen ${count} hayvanı gör`,
        image: '/images/waterfall-illustration.jpg',
        url: '/ilan/ara?postType=OWNERSHIP&page=1',
      },
      FOUND: {
        text: `Bulunan ${count} hayvanı gör`,
        image: `/images/mountain-illustration.jpg`,
        url: '/ilan/ara?postType=FOUND&page=1',
      },
    }
    return types[type]
  }

  const onMouseEnter = () => {
    const nameParentWidth = nameParentRef.current.clientWidth
    const nameWidth = nameRef.current.clientWidth

    if (nameWidth > nameParentWidth) {
      nameRef.current.style.transform = `translateX(-${
        nameWidth - nameParentWidth
      }px)`
    }
  }

  const onMouseLeave = () => {
    nameRef.current.style.transform = 'translateX(0%)'
  }

  {
    if (!info) {
      return (
        <div
          className={`rounded-2xl overflow-hidden cursor-pointer flex items-start relative`}
          style={{ aspectRatio: '1 / 1.5' }}
          onClick={() => router.push(`/ilan/${slug}`)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Image
            src={photos[0]}
            alt=''
            layout='fill'
            objectFit='cover'
            className='-z-10'
          />
          <div className='w-full p-4 pt-6 bg-gradient-to-t from-black/60 to-black/0 text-white mt-auto z-0'>
            <div
              className='overflow-hidden relative h-6 md:h-7'
              ref={nameParentRef}
            >
              <h2
                className='text-base md:text-xl font-bold whitespace-nowrap absolute left-0 top-0 transition duration-[2s] ease-linear'
                ref={nameRef}
              >
                {name}
              </h2>
            </div>
            <div className='flex justify-between mt-2'>
              <p className='text-black-200 break-all flex-1'>{`${city}, ${district}`}</p>
              <p className='text-black-200 place-self-end text-right flex-1'>
                <Moment locale='tr' fromNow>
                  {createdAt}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <li
          className={`rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center text-center p-4 relative`}
          style={{ aspectRatio: '1 / 1.5' }}
          onClick={() => router.push(handleInfoType(infoType).url)}
        >
          <Image
            src={handleInfoType(infoType).image}
            alt=''
            layout='fill'
            objectFit='cover'
            className='-z-10'
          />
          <h2 className='text-xl md:text-2xl font-bold z-0'>
            {handleInfoType(infoType, totalDocs).text}
          </h2>
        </li>
      )
    }
  }
}

export default Pet
