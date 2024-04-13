import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'
import { DialogClose } from '@/shared/ui/Dialog/DialogClose'

import s from './DialogEmailSent.module.scss'

interface Props {
  email: string | undefined
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const DialogEmailSent = ({ email, onOpenChange, open }: Props) => {
  const { t } = useTranslation()

  return (
    <Dialog onOpenChange={onOpenChange} open={open} title="Email sent">
      <div className={s.dialog}>
        {t.pages.signUp.modalText}
        {email}
        <DialogClose>
          <Button className={s.close}>{t.pages.signUp.modalBtn}</Button>
        </DialogClose>
      </div>
    </Dialog>
  )
}
