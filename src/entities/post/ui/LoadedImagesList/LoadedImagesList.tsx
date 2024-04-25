import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Close } from '@/shared/assets/icons/common'
import { Image as ImageIcon, PlusCircle } from '@/shared/assets/icons/outline'
import { photoSchema } from '@/shared/helpers'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/DropDownMenu'
import { InputFile } from '@/shared/ui/InputFile'
import clsx from 'clsx'
import Image from 'next/image'

import s from './LoadedImagesList.module.scss'

import { MAX_SIZE_IMAGE_20MB } from '../../model/const'
import { useAddPhoto } from '../../model/hooks/useAddPhoto'
import { ImageObj } from '../../model/types/postSlice.types'

type Props = {
  className?: string
  classNameTrigger?: string
  images: ImageObj[]
  onDeleteImage: (imageObj: ImageObj, idx: number) => void
  onSelectSlide?: (idx: number) => void
  onSetImage: (imageUrl: string) => void
}

export const LoadedImagesList = ({
  className,
  classNameTrigger,
  images,
  onDeleteImage,
  onSelectSlide,
  onSetImage,
}: Props) => {
  const { handleSetPhoto, setError, t } = useAddPhoto(onSetImage, images.length > 9)

  return (
    <Dropdown.Menu
      align="end"
      className={clsx(s.viewport, className)}
      modal={false}
      portal={false}
      side="top"
      sideOffset={2}
      trigger={
        <Button
          className={clsx(s.expandBtn, classNameTrigger)}
          startIcon={<ImageIcon className={s.icon} />}
          variant="text"
        />
      }
    >
      <Dropdown.Item className={s.images} onSelect={(e: Event) => e.preventDefault()}>
        <div className={s.imagesArray}>
          {images.map((image, i) => {
            const { imageURL } = image

            return (
              <div className={s.image} key={imageURL + i}>
                <Button
                  className={s.deleteBtn}
                  onClick={() => onDeleteImage(image, i)}
                  startIcon={<Close className={s.icon} />}
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
        </div>
        <InputFile
          accept=".png, .jpg, .jpeg"
          setError={setError}
          setFile={handleSetPhoto}
          zodSchema={photoSchema(t, MAX_SIZE_IMAGE_20MB)}
        >
          <PlusCircle className={s.addImageBtn} />
        </InputFile>
      </Dropdown.Item>
    </Dropdown.Menu>
  )
}
