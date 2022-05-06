import { useEffect } from 'react'
import { useFilePicker } from 'use-file-picker'
import { Button } from '@components/ui'
import Image from 'next/image'

const ImageInput = ({ setContent, setPlainContent, error, errorMessage }) => {
  const options = {
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    limitFilesConfig: { max: 5 },
    // minFileSize: 1,
    maxFileSize: 5, // in megabytes
  }

  const [openFileSelector, { filesContent, plainFiles, loading, errors }] =
    useFilePicker(options)

  const errorType = errors.length > 0 ? Object.keys(errors[0])[0] : null

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
      {errorType === 'maxLimitExceeded' && (
        <p className='text-red'>
          {options.limitFilesConfig.max} adetten fazla fotoğraf yükleyemezsiniz
        </p>
      )}
      {errorType === 'fileSizeToolarge' && (
        <p className='text-red'>
          Fotoğraf boyutu {options.maxFileSize}mb'dan büyük olamaz
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
