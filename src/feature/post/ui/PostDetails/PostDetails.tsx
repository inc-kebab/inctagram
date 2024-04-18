import { useState } from 'react'

import { CommentsList } from '@/entities/comment'
import { PostInfoAdditional, PostItem } from '@/entities/post'
import { UserBanner } from '@/entities/user'
import { useMeQuery } from '@/feature/auth'
import { PublishCommentForm, mockComments } from '@/feature/comment'
import { Arrow, More } from '@/shared/assets/icons/common'
import { Edit, Trash } from '@/shared/assets/icons/outline'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Carousel } from '@/shared/ui/Carousel'
import { Dropdown } from '@/shared/ui/DropDownMenu'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'

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
  const [comments, setComments] = useState(false)

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
      <div className={clsx(s.postDetails, comments && s.hide)}>
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
          maxMobileComments={2}
          postItem={item}
          shortenedComments
          userId={data?.id}
        />
        <PostInfoAdditional
          avatars={mockComments.lastThreeLikes}
          className={s.footer}
          datePost={item.createdAt}
          likesCount={2243}
        />
        <Typography className={s.viewComments} onClick={() => setComments(true)} variant="small">
          {`View all comments (${mockComments.items.length})`}
        </Typography>
        {isOwner && <PublishCommentForm className={s.form} />}
      </div>

      <div className={clsx(s.commentsDetails, !comments && s.hide)}>
        <div className={s.titleWrapper}>
          <Arrow onClick={() => setComments(false)} />
          <Typography variant="h2">Comments</Typography>
          <div></div>
        </div>
        <CommentsList
          className={s.content}
          comments={mockComments.items}
          postItem={item}
          userId={data?.id}
        />
      </div>
    </>
  )
}
