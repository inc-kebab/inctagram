import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'

import s from './DialogEmailSent.module.scss'

interface Props {
  email: string | undefined
  onOpenChange: () => void
  open: boolean
}

export const DialogEmailSent = ({ email, onOpenChange, open }: Props) => {
  const { t } = useTranslation()

  return (
    <Dialog onOpenChange={onOpenChange} open={open} title="Email sent">
      <div className={s.dialog}>
        {t.pages.signUp.modalText}
        {email}
        <Button className={s.close} onClick={onOpenChange}>
          {t.pages.signUp.modalBtn}
        </Button>
      </div>
    </Dialog>
  )
}
