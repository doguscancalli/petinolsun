import { Hero, PetDisplay } from '@components/common'

const Home = () => {
  return (
    <>
      <Hero />
      <PetDisplay title='Sahiplendirme İlanları' infoType='adoption' />
      <PetDisplay title='Kayıp İlanları' infoType='lost' />
      <PetDisplay title='Sahiplenme İlanları' infoType='ownership' />
      <PetDisplay title='Bulunma İlanları' infoType='found' />
    </>
  )
}

export default Home
