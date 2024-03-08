import { useState } from 'react'

import { avatarSchema } from '@/feature/profile'
import { Image as ImageSvg } from '@/shared/assets/icons/outline'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { InputFile } from '@/shared/ui/InputFile'
import { Notification } from '@/shared/ui/Notification'
import clsx from 'clsx'
import Image from 'next/image'

import s from './InputPhoto.module.scss'

type Props = {
  avatarUrl: string
  setPhoto: (photo: File) => void
}

export const InputPhoto = ({ avatarUrl, setPhoto }: Props) => {
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
      {avatarUrl ? (
        <Image alt="avatar" fill height={300} src={avatarUrl} width={300} />
      ) : (
        <div className={classes.svgWrapper}>
          <ImageSvg className={classes.imageSvg} />
        </div>
      )}
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
