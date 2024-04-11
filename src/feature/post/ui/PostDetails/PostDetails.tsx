import { CommentsList } from '@/entities/comment'
import { PostInfoAdditional, PostItem, UserBanner } from '@/entities/post'
import { useMeQuery } from '@/feature/auth'
import { PublishCommentForm, mockComments } from '@/feature/comment'
import { More } from '@/shared/assets/icons/common'
import { Edit, Trash } from '@/shared/assets/icons/outline'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Carousel } from '@/shared/ui/Carousel'
import { Dropdown } from '@/shared/ui/DropDownMenu'
import { Typography } from '@/shared/ui/Typography'

import s from './PostDetails.module.scss'

type Props = {
  isOwner: boolean
  item: Nullable<PostItem>
  onOpenConfirmDeleteModal: () => void
  onOpenEditModal: () => void
}

export const PostDetails = ({
  isOwner,
  item,
  onOpenConfirmDeleteModal,
  onOpenEditModal,
}: Props) => {
  const { t } = useTranslation()

  const { data } = useMeQuery(undefined)

  if (!item) {
    return null
  }

  const actions = isOwner ? (
    <Dropdown.Menu
      align="end"
      trigger={
        <Button style={{ padding: '0' }} variant="text">
          <More />
        </Button>
      }
    >
      <Dropdown.Item onClick={onOpenEditModal} startIcon={<Edit />}>
        <Typography variant="regular14">{t.pages.post.editPost}</Typography>
      </Dropdown.Item>
      <Dropdown.Item onClick={onOpenConfirmDeleteModal} startIcon={<Trash />}>
        <Typography variant="regular14">{t.pages.post.deletePost}</Typography>
      </Dropdown.Item>
    </Dropdown.Menu>
  ) : undefined

  return (
    <>
      <div className={s.postDetails}>
        <Carousel className={s.slider} imagesUrl={item.images} />
        <UserBanner
          actions={actions}
          avatar={item.avatarOwner}
          className={s.header}
          name={item.username}
        />
        <CommentsList
          className={s.content}
          comments={mockComments.items}
          postItem={item}
          userId={data?.id}
        />
        <PostInfoAdditional
          avatars={mockComments.lastThreeLikes}
          className={s.footer}
          datePost={item.createdAt}
          likesCount={2243}
        />
        {isOwner && <PublishCommentForm className={s.form} />}
      </div>
    </>
  )
}
