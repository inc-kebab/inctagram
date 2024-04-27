import { Close } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks'
import { DialogClose } from '@/shared/ui/Dialog/DialogClose'
import { Typography } from '@/shared/ui/Typography'

import s from './EditPostDialogTitle.module.scss'

export const EditPostDialogTitle = () => {
  const { t } = useTranslation()

  return (
    <div className={s.header}>
      <Typography asComponent="h2" className={s.edit} variant="h1">
        {t.pages.post.editPost}
      </Typography>
      <DialogClose>
        <Typography className={s.closeBtn} variant="h3">
          {t.pages.post.cancel}
        </Typography>
      </DialogClose>{' '}
      <DialogClose>
        <Close className={s.closeIcon} />
      </DialogClose>
    </div>
  )
}
