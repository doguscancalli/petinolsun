import { useState } from 'react'

import { searchNavLinks } from '@data/links'

import { Button, Modal, Select } from '@components/ui'
import AdvancedFilter from './AdvancedFilter'

const SearchNav = () => {
  const [toggleAdvancedFilter, setToggleAdvancedFilter] = useState(false)

  return (
    <div className='flex items-center mt-8'>
      {toggleAdvancedFilter && (
        <Modal>
          <AdvancedFilter setToggleAdvancedFilter={setToggleAdvancedFilter} />
        </Modal>
      )}
      <div className='max-w-[150px] lg:max-w-[200px] w-full'>
        <Select />
      </div>
      <ul className='ml-6 gap-4 hidden lg:flex'>
        {searchNavLinks.map((link, index) => (
          <li className='text-black-500' key={index}>
            <button>{link.name}</button>
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
