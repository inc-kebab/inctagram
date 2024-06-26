import { ReactNode, useState } from 'react'

import { ConfirmDialog } from '@/entities/dialog'
import { useMeQuery } from '@/feature/auth'
import { Logout } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import clsx from 'clsx'

import s from './LogoutDialog.module.scss'

type Props = {
  classNameTrigger?: string
  disabled?: boolean
  onLogout?: () => void
}

export const LogoutDialog = ({ classNameTrigger, disabled, onLogout }: Props) => {
  const [open, setOpen] = useState(false)

  const { t } = useTranslation()

  const { data } = useMeQuery(undefined)

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
        <Button className={clsx(s.logout, classNameTrigger)} startIcon={<Logout />} variant="text">
          {t.layout.sidebar.logout}
        </Button>
      }
    />
  )
}
