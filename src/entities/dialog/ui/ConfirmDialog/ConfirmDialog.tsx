import { ReactNode } from 'react'

import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'
import { DialogClose } from '@/shared/ui/Dialog/DialogClose'

import s from './ConfirmDialog.module.scss'

interface Props {
  confirmCallback?: () => void
  content: ReactNode
  customActions?: ReactNode
  disabled?: boolean
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
  trigger?: ReactNode
}

export const ConfirmDialog = ({
  confirmCallback,
  content,
  customActions,
  disabled,
  onOpenChange,
  open,
  title,
  trigger,
}: Props) => {
  const { t } = useTranslation()

  return (
    <Dialog
      className={s.root}
      onOpenChange={onOpenChange}
      open={open}
      title={title || t.label.confirmAction}
      trigger={trigger}
    >
      <div className={s.wrapper}>
        <div className={s.content}>{content}</div>
        {customActions || (
          <div className={s.actions}>
            <Button
              className={s.btn}
              disabled={disabled}
              onClick={confirmCallback}
              variant="outline"
            >
              {t.button.yes}
            </Button>
            <DialogClose>
              <Button className={s.btn} disabled={disabled}>
                {t.button.no}
              </Button>
            </DialogClose>
          </div>
        )}
      </div>
    </Dialog>
  )
}
