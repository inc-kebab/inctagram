import { ReactElement, useEffect, useState } from 'react'

import {
  Congratulations,
  EmailVerificationBlock,
  useConfirmEmailMutation,
  useResendRegLinkMutation,
} from '@/feature/auth'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { DialogEmailSent } from '@/widgets/dialogs'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

const ConfirmEmail: Page = () => {
  const [open, setOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { query } = useRouter()

  const [confirmEmail, { data, isLoading: isConfirmLoad }] = useConfirmEmailMutation()
  const [resendLink] = useResendRegLinkMutation()

  const email = query.email as string
  const confirmationCode = query.code as string

  const handleResendLink = () => {
    setDisabled(true)
    resendLink({ email }).then(res => {
      if ('data' in res) {
        setOpen(true)
      } else {
        handleErrorResponse(res.error)
      }
    })
  }

  const handleOpenChange = () => {
    setOpen(false)
    setDisabled(true)
  }

  useEffect(() => {
    confirmEmail({ confirmationCode }).then(res => {
      if ('error' in res) {
        handleErrorResponse(res.error)
      }
      setIsLoading(false)
    })
  }, [])

  if (isLoading || isConfirmLoad) {
    return <Loader fullHeight />
  }

  return data ? (
    <Congratulations />
  ) : (
    <>
      <DialogEmailSent email={email} onOpenChange={handleOpenChange} open={open} />
      <EmailVerificationBlock disabled={disabled} onResendLink={handleResendLink} />
    </>
  )
}

ConfirmEmail.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default ConfirmEmail
