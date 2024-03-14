import { useEffect, useState } from 'react'

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
  const [showLoader, setShowLoader] = useState(true)

  const { query } = useRouter()

  const [confirmEmail, { isSuccess }] = useConfirmEmailMutation()
  const [resendLink, { isLoading: isResendLoad }] = useResendRegLinkMutation()

  const email = query.email as string
  const confirmationCode = query.code as string

  const handleResendLink = () => {
    resendLink({ email }).then(res => {
      if ('data' in res) {
        setOpen(true)
      } else {
        handleErrorResponse(res.error)
      }
    })
  }

  useEffect(() => {
    if (confirmationCode) {
      confirmEmail({ confirmationCode }).then(res => {
        if ('error' in res) {
          handleErrorResponse(res.error)
        }
        setShowLoader(false)
      })
    }
  }, [confirmationCode, confirmEmail])

  if (showLoader) {
    return <Loader fullHeight />
  }

  return isSuccess ? (
    <Congratulations />
  ) : (
    <>
      <DialogEmailSent email={email} onOpenChange={setOpen} open={open} />
      <EmailVerificationBlock disabled={isResendLoad || open} onResendLink={handleResendLink} />
    </>
  )
}

ConfirmEmail.getLayout = (page, t) => {
  return (
    <AuthLayout
      description={t.pages.confirmEmail.metaDescription}
      title={t.pages.confirmEmail.metaTitle}
    >
      {page}
    </AuthLayout>
  )
}

export default ConfirmEmail
