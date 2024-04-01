import { Close } from '@/shared/assets/icons/common'
import { Image as ImageIcon, PlusCircle } from '@/shared/assets/icons/outline'
import { photoSchema } from '@/shared/helpers/validators/photoSchema'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/DropDownMenu'
import { InputFile } from '@/shared/ui/InputFile'
import clsx from 'clsx'
import Image from 'next/image'

import s from './LoadedImagesList.module.scss'

import { ImageObj } from '../../model/types/postSlice.types'

type Props = {
  className?: string
  classNameTrigger?: string
  images: ImageObj[]
  onDeleteImage: (imageObj: ImageObj) => void
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
  const { t } = useTranslation()

  const handleSetPhoto = (file: File) => {
    onSetImage(URL.createObjectURL(file))
  }

  return (
    <Dropdown.Menu
      align="end"
      className={clsx(s.viewport, className)}
      side="top"
      sideOffset={2}
      trigger={
        <Button
          className={clsx(s.expandBtn, classNameTrigger)}
          startIcon={<ImageIcon height={24} width={24} />}
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
                  onClick={() => onDeleteImage(image)}
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
        </div>
        <InputFile accept=".png, .jpg, .jpeg" setFile={handleSetPhoto} zodSchema={photoSchema(t)}>
          <PlusCircle className={s.addImageBtn} />
        </InputFile>
      </Dropdown.Item>
    </Dropdown.Menu>
  )
}
