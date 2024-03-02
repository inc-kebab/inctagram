import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'

import s from './DialogLogOut.module.scss'

interface Props {
  email: string | undefined
  onLogOut: () => void
  onOpenChange: () => void
  open: boolean
}

export const DialogLogOut = ({ email, onLogOut, onOpenChange, open }: Props) => {
  const { t } = useTranslation()

  return (
    <Dialog onOpenChange={onOpenChange} open={open} title={t.layout.sidebar.logout}>
      <div className={s.dialog}>
        {t.pages.profile.logOutConfirmation}
        {email}
        <div className="actions">
          <Button onClick={onLogOut}>{t.button.yes}</Button>
          <Button onClick={onOpenChange} variant="outline">
            {t.button.no}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
