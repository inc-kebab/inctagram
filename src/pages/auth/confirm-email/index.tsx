import { ReactElement, useEffect, useState } from 'react'

import { LocaleType } from '@/../locales'
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

  const { query } = useRouter()

  const [confirmEmail, { data, isLoading: isConfirmLoad }] = useConfirmEmailMutation()
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
    confirmEmail({ confirmationCode }).then(res => {
      if ('error' in res) {
        handleErrorResponse(res.error)
      }
    })
  }, [])

  if (isConfirmLoad) {
    return <Loader fullHeight />
  }

  return data ? (
    <Congratulations />
  ) : (
    <>
      <DialogEmailSent email={email} onOpenChange={setOpen} open={open} />
      <EmailVerificationBlock disabled={isResendLoad || open} onResendLink={handleResendLink} />
    </>
  )
}

ConfirmEmail.getLayout = (page: ReactElement, t: LocaleType) => {
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
