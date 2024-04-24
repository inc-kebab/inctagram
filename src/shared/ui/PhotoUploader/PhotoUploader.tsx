import { useState } from 'react'

import { Image as ImageSvg } from '@/shared/assets/icons/outline'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { InputFile } from '@/shared/ui/InputFile'
import { Notification } from '@/shared/ui/Notification'
import clsx from 'clsx'
import { ZodEffects } from 'zod'

import s from './PhotoUploader.module.scss'

type Props = {
  setPhoto: (photo: File) => void
  zodSchema: ZodEffects<any>
}

export const PhotoUploader = ({ setPhoto, zodSchema }: Props) => {
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
      <div className={classes.svgWrapper}>
        <ImageSvg className={classes.imageSvg} />
      </div>
      <InputFile
        accept=".png, .jpg, .jpeg"
        setError={setError}
        setFile={setPhoto}
        zodSchema={zodSchema}
      >
        <Button asComponent="span" className={s.button}>
          {t.button.selectFromComputer}
        </Button>
      </InputFile>
    </div>
  )
}
