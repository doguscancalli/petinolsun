import { Hero, PetDisplay } from '@components/common'

const Home = () => {
  return (
    <>
      <Hero />
      <PetDisplay title='Sahiplendirme ilanları' infoType='adoption' />
      <PetDisplay title='Kayıp ilanları' infoType='lost' />
      <PetDisplay title='Sahiplenme ilanları' infoType='ownership' />
      <PetDisplay title='Bulunma ilanları' infoType='found' />
    </>
  )
}

export default Home
