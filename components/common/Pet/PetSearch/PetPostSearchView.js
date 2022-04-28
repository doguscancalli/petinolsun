<<<<<<< HEAD
import { useState } from 'react'

import { Button } from '@components/ui'
import Pet from '../Pet'
import SearchNav from './SearchNav'

const PetPostSearchView = () => {
  const [toggleMap, setToggleMap] = useState(false)

  return (
    <div>
      <SearchNav />
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'>
        <Pet />
        <Pet />
        <Pet />
        <Pet />
        <Pet />
        <Pet />
        <Pet />
        <Pet />
        <Pet />
        <Pet />
      </div>
      <div className='fixed bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-40'>
        <Button onClick={() => setToggleMap(!toggleMap)}>
          {toggleMap ? 'Listede göster' : 'Haritada göster'}
        </Button>
      </div>
=======
import SearchNav from './SearchNav'

const PetPostSearchView = () => {
  return (
    <div>
      <SearchNav />
>>>>>>> f1d5a559ede0ece2ff1afc3c8ce038e30043dd7e
    </div>
  )
}

export default PetPostSearchView
