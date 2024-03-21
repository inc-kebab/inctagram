import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { useDeleteImageMutation } from '@/feature/posts/api/posts-api'
import { ImageObj, postsActions } from '@/feature/posts/api/posts-slice'
import { avatarSchema } from '@/feature/profile/model/utils/validators/addAvatar'
import { Close } from '@/shared/assets/icons/common/index'
import { Image as ImageIcon, PlusCircle } from '@/shared/assets/icons/outline/index'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { InputFile } from '@/shared/ui/InputFile'
import Image from 'next/image'

import s from './ImagesArrayBtn.module.scss'

type Props = {
  images: ImageObj[]
}

export const ImagesArrayBtn = ({ images }: Props) => {
  const arr = useAppSelector(state => state.posts.images)
  const dispatch = useAppDispatch()

  const [deleteImage] = useDeleteImageMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleDeleteImage = (imageURL: string) => {
    // deleteImage(uploadId)
    dispatch(postsActions.removeImage(imageURL))
  }

  const handleSetPhoto = (file: File | any) => {
    const imageURL = URL.createObjectURL(file)

    dispatch(postsActions.addImage({ aspect: 3 / 4, imageURL }))
  }

  return (
    <>
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
          {images &&
            images.map((image, i) => (
              <div className={s.image} key={image.imageURL + i}>
                <Button
                  className={s.deleteBtn}
                  onClick={() => handleDeleteImage(image.imageURL)}
                  startIcon={<Close color="var(--light-100)" height={13} width={13} />}
                  variant="text"
                />
                <Image alt="" height={80} src={image.imageURL} width={80} />
              </div>
            ))}
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
    </>
  )
}
