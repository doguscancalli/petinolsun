import { Avatar } from '@components/common'
import { useSelector } from 'react-redux'
import { Button, Modal } from '@components/ui'
import { useEffect, useState } from 'react'
import fields from '@data/settingsFields'
import { isObjectEmpty } from '@utils'
import { PulseLoader } from 'react-spinners'
import { useRouter } from 'next/router'

const SettingsView = () => {
  const { user } = useSelector((state) => state.auth)

  const router = useRouter()

  const [selectedField, setSelectedField] = useState('')

  useEffect(() => {
    if (!user) router.push('/giris')
  }, [user])

  const Component = selectedField.component

  const handleClick = (name) => {
    const filteredField = fields.find((field) => field.name === name)
    setSelectedField(filteredField)
  }

  const handleComponentData = () => {
    if (selectedField.valueType === 'multiContent') {
      return selectedField.value.split(',').map((value) => user[value])
    }
    return user[selectedField.value]
  }

  if (!user) return

  if (isObjectEmpty(user)) return <PulseLoader size={8} />

  return (
    <div className='max-w-lg mx-auto mt-16'>
      {selectedField && (
        <Modal>
          <Component
            id={user?.id}
            data={handleComponentData()}
            setSelectedField={setSelectedField}
          />
        </Modal>
      )}
      <div className='flex gap-4 items-center mx-auto'>
        <Avatar
          url={`https://ui-avatars.com/api/?name=${user?.name?.replace(
            /\s+/g,
            '-'
          )}&background=000&color=fff`}
          large
        />
        <h2 className='text-xl md:text-2xl font-bold'>{user?.name}</h2>
      </div>
      <ul className='flex flex-col gap-6 mt-8'>
        {fields.map(({ name, valueType, value }) => (
          <li key={name}>
            <div className='flex justify-between mb-4'>
              <h3 className='text-lg md:text-2xl font-bold'>{name}</h3>
              <Button size='small' onClick={() => handleClick(name)}>
                Değiştir
              </Button>
            </div>
            {valueType === 'content' && (
              <p className='text-black-500'>{user[value]}</p>
            )}
            {valueType === null && <p className='text-black-500'>{value}</p>}
          </li>
        ))}
      </ul>
      {/* <p className='text-red mt-6'>Hesabımı kapat</p> */}
    </div>
  )
}

export default SettingsView
