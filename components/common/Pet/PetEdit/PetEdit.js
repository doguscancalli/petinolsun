import { useState } from 'react'
import Image from 'next/image'

import fields from '@data/petPostEditFields'

import { Button, Modal } from '@components/ui'

const PetEdit = () => {
  const [selectedField, setSelectedField] = useState('')

  const Component = selectedField.component

  const handleClick = (name) => {
    const filteredField = fields.find((field) => field.name === name)
    setSelectedField(filteredField)
  }

  return (
    <div className='max-w-lg mx-auto mt-16'>
      {selectedField && (
        <Modal>
          <Component />
        </Modal>
      )}

      <h1 className='text-2xl md:text-3xl font-bold mb-8'>
        Kratos adlı sahiplendirme ilanınızı düzenleyin
      </h1>
      <ul className='flex flex-col gap-6'>
        {fields.map(({ name, content }) => (
          <li key={name}>
            <div className='flex justify-between'>
              <h3 className='text-lg md:text-2xl font-bold'>{name}</h3>
              <Button size='small' onClick={() => handleClick(name)}>
                Değiştir
              </Button>
            </div>
            {typeof content === 'string' ? (
              <p className='text-black-500 mt-1'>{content}</p>
            ) : (
              <ul className='grid grid-cols-3 md:grid-cols-5 gap-2 mt-2'>
                {content.map((item) => (
                  <li
                    className='relative'
                    style={{
                      aspectRatio: '1 / 1.2',
                    }}
                    key={item}
                  >
                    <Image
                      className='rounded-lg'
                      src={item}
                      alt=''
                      layout='fill'
                      objectFit='cover'
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PetEdit
