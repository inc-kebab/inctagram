import { useState } from 'react'

import { useAppDispatch } from '@/app/store/store'
import { useDeleteImageMutation } from '@/feature/post/api/post-api'
import { ImageObj, postsActions } from '@/feature/post/api/post-slice'
import { avatarSchema } from '@/feature/profile/model/utils/validators/addAvatar'
import { Close } from '@/shared/assets/icons/common/index'
import { Image as ImageIcon, PlusCircle } from '@/shared/assets/icons/outline/index'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { InputFile } from '@/shared/ui/InputFile'
import Image from 'next/image'

import s from './ImagesArrayBtn.module.scss'

type Props = {
  className?: string
  images: ImageObj[]
  navigateToLastSlide: () => void
}

export const ImagesArrayBtn = ({ className, images, navigateToLastSlide }: Props) => {
  const dispatch = useAppDispatch()
  const [deleteImage] = useDeleteImageMutation()
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleDeleteImage = (imageObj: ImageObj) => {
    if (imageObj.uploadId) {
      deleteImage(imageObj.uploadId)
    }
    dispatch(postsActions.removeImage(imageObj.imageURL))
  }

  const handleSetPhoto = (file: File | any) => {
    const imageURL = URL.createObjectURL(file)

    dispatch(postsActions.addImage({ aspect: 0, imageURL }))
    setIsOpen(false)
    navigateToLastSlide()
  }

  return (
    <div className={className}>
      <Button
        className={s.imagesArrayBtn}
        onClick={() => setIsOpen(!isOpen)}
        startIcon={
          <ImageIcon
            color={isOpen ? 'var(--primary-500)' : 'var(--light-100)'}
            height={24}
            width={24}
          />
        }
      />

      {isOpen && (
        <div className={s.wrapper}>
          <div className={s.images}>
            {images &&
              images.map((image, i) => {
                const { imageURL } = image

                return (
                  <div className={s.image} key={imageURL + i}>
                    <Button
                      className={s.deleteBtn}
                      onClick={() => handleDeleteImage(image)}
                      startIcon={<Close color="var(--light-100)" height={13} width={13} />}
                      variant="text"
                    />
                    <Image alt="" height={80} src={imageURL} width={80} />
                  </div>
                )
              })}
          </div>
          <InputFile
            accept=".png, .jpg, .jpeg"
            setError={setError}
            setFile={handleSetPhoto}
            zodSchema={avatarSchema(t)}
          >
            <PlusCircle className={s.addImageBtn} />
          </InputFile>
        </div>
      )}
    </div>
  )
}
