import { useState } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { InputFile } from '@/shared/ui/InputFile'
import { Notification } from '@/shared/ui/Notification'
import clsx from 'clsx'

import s from './InputPhoto.module.scss'

import { avatarSchema } from '../../model/utils/validators/addAvatar'

type Props = {
  setPhoto: (photo: File) => void
}

export const InputPhoto = ({ setPhoto }: Props) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')

  const classes = {
    button: s.button,
    dialogContainer: clsx(s.dialogContainer, { [s.error]: error }),
    imageSvg: s.imageSvg,
    notification: clsx(s.notification, { [s.error]: error }),
    svgWrapper: s.svgWrapper,
  }

  return (
    <div className={classes.dialogContainer}>
      {error && <Notification className={classes.notification} error={error} />}
      <Avatar className={classes.svgWrapper} />
      <InputFile
        accept=".png, .jpg, .jpeg"
        setError={setError}
        setFile={setPhoto}
        zodSchema={avatarSchema(t)}
      >
        <Button asComponent="span" className={s.button}>
          {t.button.selectFromComputer}
        </Button>
      </InputFile>
    </div>
  )
}
