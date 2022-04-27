import { Input, Button, Checkbox } from '@components/ui'

const ContactInfo = () => {
  return (
    <>
      <form className='mt-4 flex flex-col gap-4'>
        <h2 className='text-xl md:text-2xl font-bold'>
          İletişim bilgilerinizi girin
        </h2>
        <Input placeholder='Telefon Numarası' />
        <Checkbox
          label='Whatsapp üzerinden mesaj atabilirler'
          htmlFor='phoneNumber'
        />
        <div className='flex flex-col gap-2'>
          <Button grow>İlanı Paylaş</Button>
          <Button variant='secondary' grow>
            Geri
          </Button>
        </div>
      </form>
    </>
  )
}

export default ContactInfo
