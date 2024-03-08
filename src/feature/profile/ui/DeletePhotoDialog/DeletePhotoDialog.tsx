import { ConfirmDialog } from '@/widgets/dialogs'

export const DeletePhotoDialog = () => {
  return (
    <ConfirmDialog
      confirmCallback={() => {}}
      content="заглушка"
      onOpenChange={() => {}}
      open={false}
    />
  )
}
