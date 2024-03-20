import { ReactNode } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { ConfirmDialog } from '@/widgets/dialogs'

type Props = {
  confirmCallback: () => void
  disabled?: boolean
  open: boolean
  setOpen: (open: boolean) => void
  trigger?: ReactNode
}

export const DeletePostDialog = ({ setOpen, ...props }: Props) => {
  const { t } = useTranslation()

  return (
    <ConfirmDialog
      content={t.pages.post.deletePostQuestion}
      onOpenChange={setOpen}
      title={t.pages.post.deletePost}
      {...props}
    />
  )
}
