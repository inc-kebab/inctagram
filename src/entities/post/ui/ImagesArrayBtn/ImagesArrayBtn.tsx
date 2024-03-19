import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { useDeleteImageMutation } from '@/feature/posts/api/posts-api'
import { postsActions } from '@/feature/posts/api/posts-slice'
import { avatarSchema } from '@/feature/profile/model/utils/validators/addAvatar'
import { Close } from '@/shared/assets/icons/common/index'
import { Image as ImageIcon, PlusCircle } from '@/shared/assets/icons/outline/index'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { InputFile } from '@/shared/ui/InputFile'
import Image from 'next/image'

import s from './ImagesArrayBtn.module.scss'

type Props = {
  setPhoto: (photo: File) => void
}

export const ImagesArrayBtn = ({ setPhoto }: Props) => {
  const arr = useAppSelector(state => state.posts.images)
  const dispatch = useAppDispatch()
  const [deleteImage] = useDeleteImageMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleDeleteImage = (uploadId: string) => {
    deleteImage(uploadId)
    dispatch(postsActions.removeImage(uploadId))
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
          {arr &&
            arr.map(img => (
              <div className={s.image} key={img.imageURL}>
                <Button
                  className={s.deleteBtn}
                  onClick={() => handleDeleteImage(img.uploadId)}
                  startIcon={<Close color="var(--light-100)" height={13} width={13} />}
                  variant="text"
                />
                <Image alt="" height={80} src={img.imageURL} width={80} />
              </div>
            ))}
          <InputFile
            accept=".png, .jpg, .jpeg"
            setError={setError}
            setFile={setPhoto}
            zodSchema={avatarSchema(t)}
          >
            <PlusCircle className={s.addImageBtn} />
          </InputFile>
        </div>
      )}
    </>
  )
}
