import { ReactNode } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'
import { DialogClose } from '@/shared/ui/Dialog/DialogClose'

import s from './ConfirmDialog.module.scss'

interface Props {
  confirmCallback: () => void
  content: ReactNode
  disabled?: boolean
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
  trigger?: ReactNode
}

export const ConfirmDialog = ({
  confirmCallback,
  content,
  disabled,
  onOpenChange,
  open,
  title,
  trigger,
}: Props) => {
  const { t } = useTranslation()

  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={open}
      title={title || t.label.confirmAction}
      trigger={trigger}
    >
      <div className={s.dialog}>
        {content}
        <div className={s.actions}>
          <Button disabled={disabled} onClick={confirmCallback} variant="outline">
            {t.button.yes}
          </Button>
          <DialogClose>
            <Button disabled={disabled}>{t.button.no}</Button>
          </DialogClose>
        </div>
      </div>
    </Dialog>
  )
}
