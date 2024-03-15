import { ReactNode, useState } from 'react'

import { useMeQuery } from '@/feature/auth'
import { Logout } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { ConfirmDialog } from '@/widgets/dialogs'

import s from './LogoutDialog.module.scss'

type Props = {
  disabled?: boolean
  onLogout?: () => void
}

export const LogoutDialog = ({ disabled, onLogout }: Props) => {
  const [open, setOpen] = useState(false)

  const { t } = useTranslation()

  const { data } = useMeQuery()

  const textContent: ReactNode = (
    <div>
      {t.pages.profile.logOutConfirmation}
      <span className={s.email}> “{data?.email}”</span>?
    </div>
  )

  return (
    <ConfirmDialog
      confirmCallback={onLogout}
      content={textContent}
      disabled={disabled}
      onOpenChange={setOpen}
      open={open}
      title={t.layout.sidebar.logout}
      trigger={
        <Button className={s.logout} startIcon={<Logout />} variant="text">
          {t.layout.sidebar.logout}
        </Button>
      }
    />
  )
}
