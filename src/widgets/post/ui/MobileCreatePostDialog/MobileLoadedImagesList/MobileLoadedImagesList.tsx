import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ImageObj, MAX_SIZE_IMAGE_20MB } from '@/entities/post'
import { Close } from '@/shared/assets/icons/common'
import { PlusCircle } from '@/shared/assets/icons/outline'
import { photoSchema } from '@/shared/helpers'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { InputFile } from '@/shared/ui/InputFile'
import Image from 'next/image'

import s from './MobileLoadedImagesList.module.scss'

type Props = {
  className?: string
  classNameTrigger?: string
  images: ImageObj[]
  onDeleteImage: (imageObj: ImageObj, index: number) => void
  onSelectSlide?: (idx: number) => void
  onSetImage: (imageUrl: string) => void
}

export const MobileLoadedImagesList = ({
  images,
  onDeleteImage,
  onSelectSlide,
  onSetImage,
}: Props) => {
  const { t } = useTranslation()

  const [error, setError] = useState('')

  const handleSetPhoto = (file: File) => {
    if (images.length > 9) {
      setError(t.pages.post.maxPost)

      return
    }

    if (!error) {
      onSetImage(URL.createObjectURL(file))
    }
    setError('')
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      setError('')
    }
  }, [error])

  return (
    <div className={s.images}>
      <div className={s.imagesArray}>
        {images.map((image, i) => {
          const { imageURL } = image

          return (
            <div className={s.image} key={imageURL + i}>
              <Button
                className={s.deleteBtn}
                onClick={() => onDeleteImage(image, i)}
                startIcon={<Close color="var(--light-100)" height={13} width={13} />}
                variant="text"
              />
              <Image
                alt="UI"
                fill
                onClick={() => onSelectSlide?.(i)}
                src={imageURL}
                style={{ objectFit: 'cover' }}
              />
            </div>
          )
        })}
        <InputFile
          accept=".png, .jpg, .jpeg"
          multiple
          setError={setError}
          setFile={handleSetPhoto}
          zodSchema={photoSchema(t, MAX_SIZE_IMAGE_20MB)}
        >
          <div className={s.addImageBtn}>
            <PlusCircle />
            Add Photo
          </div>
        </InputFile>
      </div>
    </div>
  )
}
