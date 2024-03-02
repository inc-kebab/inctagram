import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { useLogoutMutation } from '@/feature/auth'
import { Logout } from '@/shared/assets/icons/common'
import { AppRoutes } from '@/shared/const/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { DialogLogOut } from '@/widgets/dialogs'
import { useRouter } from 'next/router'

import s from './LogOut.module.scss'

export const LogOut = () => {
  const [logOut] = useLogoutMutation()
  const { push } = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogOut = async (): Promise<void> => {
    try {
      await logOut()
      // deleteCookie("accessToken");
      setOpen(false)
      void push(AppRoutes.MAIN)
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    }
  }

  return (
    <>
      <Button className={s.logout} onClick={handleOpen} startIcon={<Logout />} variant="text">
        {t.layout.sidebar.logout}
      </Button>
      <DialogLogOut email="email" onLogOut={handleLogOut} onOpenChange={handleClose} open={open} />;
    </>
  )
}
