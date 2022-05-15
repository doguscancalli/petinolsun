import { useEffect } from 'react'
import { useFilePicker } from 'use-file-picker'
import { Button } from '@components/ui'
import Image from 'next/image'

const ImageInput = ({
  setContent,
  setPlainContent,
  error,
  errorMessage,
  minFile,
  maxFile,
  disabled,
}) => {
  const options = {
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    limitFilesConfig: { min: minFile ?? 1, max: maxFile ?? 5 },
    maxFileSize: 5, // in megabytes
  }

  const [openFileSelector, { filesContent, plainFiles, loading, errors }] =
    useFilePicker(options)

  useEffect(() => {
    if (setContent) setContent(filesContent)
    if (setPlainContent) setPlainContent(plainFiles)
  }, [filesContent])

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-2xl flex items-center flex-col gap-2 p-10 ${
          errors.length > 0 || error ? 'border-red-400' : 'border-black-500'
        }`}
        onClick={() => {
          if (disabled || loading) return
          openFileSelector()
        }}
      >
        <p className='text-center'>Fotoğrafları seçin</p>
        <Button
          variant='secondary'
          size='small'
          loading={loading}
          disabled={disabled || loading}
        >
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
            `${maxFile || 5} adetten fazla fotoğraf yükleyemezsiniz`}
          {errors[0].minLimitNotReached &&
            `En az ${minFile || 1} fotoğraf eklemelisiniz`}
        </p>
      )}
      <ul className='grid grid-cols-5 gap-2 mt-4'>
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
    </div>
  )
}

export default ImageInput
