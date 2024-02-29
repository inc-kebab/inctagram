import { ReactElement, useEffect, useState } from 'react'

import { Congratulations, EmailVerificationBlock } from '@/feature/auth'
import { useConfirmEmailMutation, useResendRegLinkMutation } from '@/feature/auth/api/auth-api'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { DialogEmailSent } from '@/widgets/Dialogs/dialogEmailSent'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

const ConfirmEmail: Page = () => {
  const { query } = useRouter()
  const [open, setOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [confirmEmail, { data, isLoading: isConfirmLoad }] = useConfirmEmailMutation()
  const [resendLink] = useResendRegLinkMutation()
  const [isLoading, setIsLoading] = useState(true)

  const email = query.email as string
  const confirmationCode = query.code as string

  useEffect(() => {
    confirmEmail({ confirmationCode }).then(() => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading || isConfirmLoad) {
    return <Loader fullHeight />
  }

  const resendLinkHandler = () => {
    email &&
      resendLink({ email }).then(res => {
        if ('data' in res) {
          setOpen(true)
        }
      })
  }

  const onOpenChangeHandler = () => {
    setOpen(false)
    setDisabled(true)
  }

  return data ? (
    <Congratulations />
  ) : (
    <>
      <DialogEmailSent email={email} onOpenChange={onOpenChangeHandler} open={open} />
      <EmailVerificationBlock disabled={disabled} onResendLink={resendLinkHandler} />
    </>
  )
}

ConfirmEmail.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default ConfirmEmail
