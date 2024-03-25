import { useState } from 'react'

import { useAppDispatch } from '@/app/store/store'
import { postsActions } from '@/feature/post/api/post-slice'
import { Image as ImageSvg } from '@/shared/assets/icons/outline'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { InputFile } from '@/shared/ui/InputFile'
import { Notification } from '@/shared/ui/Notification'
import clsx from 'clsx'

import s from './InputPhoto.module.scss'

import { avatarSchema } from '../../model/utils/validators/addAvatar'

type Props = {
  setPhoto?: (photo: File) => void
}

export const InputPhoto = ({ setPhoto }: Props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [error, setError] = useState('')

  const classes = {
    button: s.button,
    dialogContainer: clsx(s.dialogContainer, { [s.error]: error }),
    imageSvg: s.imageSvg,
    notification: clsx(s.notification, { [s.error]: error }),
    svgWrapper: s.svgWrapper,
  }
  const onSetPhoto = (file: File) => {
    const imageURL = URL.createObjectURL(file)

    dispatch(postsActions.addImage({ aspect: 0, imageURL }))
  }

  return (
    <div className={classes.dialogContainer}>
      {error && <Notification className={classes.notification} error={error} />}
      <div className={classes.svgWrapper}>
        <ImageSvg className={classes.imageSvg} />
      </div>
      <InputFile
        accept=".png, .jpg, .jpeg"
        setError={setError}
        setFile={setPhoto ? setPhoto : onSetPhoto}
        zodSchema={avatarSchema(t)}
      >
        <Button asComponent="span" className={s.button}>
          {t.button.selectFromComputer}
        </Button>
      </InputFile>
    </div>
  )
}
