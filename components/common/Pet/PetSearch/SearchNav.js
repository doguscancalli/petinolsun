import { useState } from 'react'
import { Button, Modal, Select } from '@components/ui'
import AdvancedFilter from './AdvancedFilter'
import { objectToArray } from '@utils'
import { ANIMAL, POST_TYPE } from '@data/constants'
import { useRouter } from 'next/router'

const SearchNav = () => {
  const [toggleAdvancedFilter, setToggleAdvancedFilter] = useState(false)

  const router = useRouter()

  const options = objectToArray(POST_TYPE)

  const handleType = (e) => {
    router.replace({
      query: { ...router.query, postType: e.target.value },
    })
  }

  const searchNavLinks = objectToArray(ANIMAL)

  const handleAnimal = ({ value }) => {
    router.push(`/ilan/ara?animal=${value}&page=1`, undefined, {
      shallow: true,
    })
  }

  return (
    <div className='flex items-center gap-2 mt-8'>
      {toggleAdvancedFilter && (
        <Modal>
          <AdvancedFilter setToggleAdvancedFilter={setToggleAdvancedFilter} />
        </Modal>
      )}
      <div className='max-w-[200px] w-full'>
        <Select
          options={options}
          onChange={handleType}
          defaultValue={router?.query?.postType}
        />
      </div>
      <ul className='ml-6 gap-4 hidden lg:flex'>
        {searchNavLinks.map((link, index) => (
          <li className='text-black-500' key={index}>
            <button onClick={() => handleAnimal(link)}>{link.name}</button>
          </li>
        ))}
      </ul>
      <div className='ml-auto'>
        <Button onClick={() => setToggleAdvancedFilter(true)}>Filtere</Button>
      </div>
    </div>
  )
}

export default SearchNav
