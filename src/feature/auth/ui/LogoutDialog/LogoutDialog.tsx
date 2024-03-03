import React, { useState } from 'react'

import { useMeQuery } from '@/feature/auth'
import { Logout } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { ConfirmDialog } from '@/widgets/dialogs'

import s from './LogoutDialog.module.scss'

type Props = {
  disabled?: boolean
  onLogout: () => void
}

export const LogoutDialog = ({ disabled, onLogout }: Props) => {
  const [open, setOpen] = useState(false)

  const { t } = useTranslation()

  const { data } = useMeQuery()

  return (
    <ConfirmDialog
      confirmCallback={onLogout}
      content={`${t.pages.profile.logOutConfirmation} ${data?.email}`}
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
