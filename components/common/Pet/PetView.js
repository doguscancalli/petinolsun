import { Button } from '@components/ui'
import Avatar from '../Avatar'
import PetImages from './PetImages'

const PetView = () => {
  return (
    <div className='mt-8 grid lg:grid-cols-2 gap-16'>
      <PetImages />
      <article>
        <div className='flex justify-between flex-col md:flex-row gap-2'>
          <div className='flex items-center'>
            <h1 className='text-3xl md:text-4xl font-bold'>Kratos</h1>
            <span className='mx-4 text-black-500'>•</span>
            <p className='text-black-500'>Ankara, Etimesgut</p>
          </div>
          <div>
            <Button>İlanı Düzenle</Button>
          </div>
        </div>
        <div className='flex gap-2 items-center mt-4'>
          <Avatar url='https://ui-avatars.com/api/?name=Clara+Oswald&background=000&color=fff' />
          <p className='text-sm font-bold'>Clara Oswald</p>
          <p className='text-sm text-black-500'>tarafından</p>
          <p className='text-sm'>2 gün önce</p>
        </div>
        <div className='flex gap-2 mt-8 flex-wrap'>
          <Button grow>Soru Sor</Button>
          <Button grow>
            <span>Ara</span>
            <span>05555555555</span>
          </Button>
          <Button grow>Whatsapp</Button>
          <Button grow>Paylaş</Button>
          <Button grow>Şikayet Et</Button>
        </div>
        <div className='mt-8'>
          <div className='flex items-center'>
            <h2 className='text-xl md:text-2xl font-bold'>Detaylar</h2>
            <span className='mx-4 text-black-500'>•</span>
            <p className='text-black-500'>Sahiplendirme, Yavru, Erkek</p>
          </div>
          <p className='mt-4 text-black-500'>
            Zombie ipsum reversus ab viral inferno nam rick, dentevil hoc unum
            Undead tardius contagium cerebella, superesse grusome vulnerum
            apathetic agite fascinati. Oculos unleashed nos perhsaps bat dead
            missing Summus snow, mortui screams de dead nobis survivor brains,
            ipsa cemetery terribiles Vivens suscitat bello Nescio. Horrenda
            dictum cerebro resurgere rick de scythe Clairvius Congress gelida,
            morbi impetum Fit stalking sacerdos zomby clairvius terrore cerebro,
            iride haec nostram infect viventium Undead unholy ground. Evil et
            eliv wal unum carnis back Nescio vel yof sit' dead, implent accedens
            de ab bello animated cemetery lumbering monstra man, scythe burial
            resurgere in carnem chainsaw terribilem auras Maleficia! viventium.
            Living grimes mundi the after inferno cerebro Souless ground
            tattered, morbo darkness ulnis mortui patriae fugere carnem horum,
            deadsentio twen sit sit' ipsum Forsitan viventium fascinati. Crabs
            braaaiiiins burial apocalypsi zeder zombi Ut, snow cerebro Romero
            narcisse left haec, malus bello incessu gelida sacerdos. Kirkman
            Narcisse corpora braindead beheading Vivens patriae accedunt,
            Congress kill sicut et horrifying Terror, tardius mortuos terrenti
            nostra carne cemetery.
          </p>
        </div>
        <div className='mt-16'>
          <h2 className='text-xl md:text-2xl font-bold'>Haritada Gör</h2>
        </div>
      </article>
    </div>
  )
}

export default PetView
