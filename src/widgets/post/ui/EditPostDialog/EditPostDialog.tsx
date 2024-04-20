import { PostItem } from '@/entities/post'
import { UserBanner } from '@/entities/user'
import { EditPostForm } from '@/feature/post'
import { Close } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks'
import { Carousel } from '@/shared/ui/Carousel'
import { Dialog } from '@/shared/ui/Dialog'
import { DialogClose } from '@/shared/ui/Dialog/DialogClose'
import { Typography } from '@/shared/ui/Typography'

import s from './EditPostDialog.module.scss'

type Props = {
  currentPost: Nullable<PostItem>
  editPostRef: any
  handleChangeOpenEditModal: any
  handleSubmitEditPost: any
  isEditLoad: boolean
  openEditModal: any
}
export const EditPostDialog = ({
  currentPost,
  editPostRef,
  handleChangeOpenEditModal,
  handleSubmitEditPost,
  isEditLoad,
  openEditModal,
}: Props) => {
  const { t } = useTranslation()

  return (
    <Dialog className={s.dialog} onOpenChange={handleChangeOpenEditModal} open={openEditModal}>
      <div className={s.editDialog}>
        <div className={s.header}>
          <Typography className={s.edit} variant="h1">
            {t.pages.post.editPost}
          </Typography>
          <DialogClose>
            <Typography className={s.cancel} variant="h3">
              {t.pages.post.cancel}
            </Typography>
          </DialogClose>
          <DialogClose>
            <Close className={s.closeIcon} />
          </DialogClose>
        </div>
        <Carousel className={s.slider} imagesUrl={currentPost?.images} />
        <UserBanner
          avatar={currentPost?.avatarOwner}
          className={s.title}
          name={currentPost?.username || ''}
        />
        <EditPostForm
          className={s.comment}
          currentDescription={currentPost?.description}
          disabled={isEditLoad}
          onSubmit={handleSubmitEditPost}
          ref={editPostRef}
          style={{ height: '100%' }}
          submitBtnClass={s.save}
          titleSubmit={t.pages.post.save}
        />
      </div>
    </Dialog>
  )
}
