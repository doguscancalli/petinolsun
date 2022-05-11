import { useEffect } from 'react'
import { useFilePicker } from 'use-file-picker'
import { Button } from '@components/ui'
import Image from 'next/image'

const ImageInput = ({ setContent, setPlainContent, error, errorMessage }) => {
  const options = {
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    limitFilesConfig: { min: 1, max: 5 },
    maxFileSize: 5, // in megabytes
  }

  const [openFileSelector, { filesContent, plainFiles, loading, errors }] =
    useFilePicker(options)

  useEffect(() => {
    if (setContent) setContent(filesContent)
    if (setPlainContent) setPlainContent(plainFiles)
  }, [filesContent])

  return (
    <>
      <div
        className={`border-2 border-dashed rounded-2xl flex items-center flex-col gap-2 p-10 ${
          errors.length > 0 || error ? 'border-red-400' : 'border-black-500'
        }`}
        onClick={() => openFileSelector()}
      >
        <p className='text-center'>Fotoğrafları seçin</p>
        <Button variant='secondary' size='small' loading={loading}>
          Gözat
        </Button>
      </div>
      {error && <p className='text-red'>{errorMessage}</p>}
      {errors.length > 0 && (
        <p className='text-red'>
          {errors[0].fileSizeTooSmall && 'Dosya boyutu çok küçük'}
          {errors[0].fileSizeToolarge && `Fotoğraf boyutu 5mb'dan büyük olamaz`}
          {errors[0].readerError && 'Fotoğraf eklenirken bir hata oluştu'}
          {errors[0].maxLimitExceeded &&
            '5 adetten fazla fotoğraf yükleyemezsiniz'}
          {errors[0].minLimitNotReached && 'En az 1 fotoğraf eklemelisiniz'}
        </p>
      )}
      <ul className='grid grid-cols-5 gap-2'>
        {filesContent.map((file, index) => (
          <li
            className='relative group'
            key={index}
            style={{
              aspectRatio: '1/1.5',
            }}
          >
            <Image
              className='rounded-lg'
              src={file.content}
              alt={file.name}
              layout='fill'
              objectFit='cover'
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ImageInput
