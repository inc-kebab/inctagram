import { ReactNode } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { ConfirmDialog } from '@/widgets/dialogs'

type Props = {
  confirmCallback: () => void
  disabled?: boolean
  open: boolean
  setOpen: (open: boolean) => void
  trigger: ReactNode
}
export const DeletePhotoDialog = ({ confirmCallback, disabled, open, setOpen, trigger }: Props) => {
  const { t } = useTranslation()

  return (
    <ConfirmDialog
      confirmCallback={confirmCallback}
      content={t.pages.profile.deleteProfilePhoto}
      disabled={disabled}
      onOpenChange={() => setOpen(!open)}
      open={open}
      title={t.pages.profile.deletePhoto}
      trigger={trigger}
    />
  )
}
