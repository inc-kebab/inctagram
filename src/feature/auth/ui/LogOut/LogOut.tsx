import React, { useState } from 'react'

import { Logout } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { DialogLogOut } from '@/widgets/dialogs'

import s from './LogOut.module.scss'

type Props = {
  isLoading: boolean
  onLogOut: () => void
}

export const LogOut = ({ isLoading, onLogOut }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button className={s.logout} onClick={handleOpen} startIcon={<Logout />} variant="text">
        {t.layout.sidebar.logout}
      </Button>
      <DialogLogOut
        disabled={isLoading}
        // TODO add email to props
        email="email"
        onLogOut={onLogOut}
        onOpenChange={handleClose}
        open={open}
      />
    </>
  )
}
