import { useState } from 'react'

import { CommentsDetails, CommentsList } from '@/entities/comment'
import { PostInfoAdditional, PostItem } from '@/entities/post'
import { UserBanner } from '@/entities/user'
import { useMeQuery } from '@/feature/auth'
import { PublishCommentForm, mockComments } from '@/feature/comment'
import { More } from '@/shared/assets/icons/common'
import { Edit, Trash } from '@/shared/assets/icons/outline'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Carousel } from '@/shared/ui/Carousel'
import { Dropdown } from '@/shared/ui/DropDownMenu'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'

import s from './PostDetails.module.scss'

type Props = {
  isAuth: boolean
  item: Nullable<PostItem>
  onOpenConfirmDeleteModal: () => void
  onOpenEditModal: () => void
}

export const PostDetails = ({ isAuth, item, onOpenConfirmDeleteModal, onOpenEditModal }: Props) => {
  const { t } = useTranslation()
  const { data } = useMeQuery(undefined)
  const [isShowOnlyComments, setIsShowOnlyComments] = useState(false)
  const [openMobileCommentForm, setOpenMobileCommentForm] = useState(false)

  const toggleShowCommentForm = () => setOpenMobileCommentForm(prev => !prev)

  if (!item) {
    return null
  }

  const actions = isAuth ? (
    <Dropdown.Menu
      align="end"
      modal={false}
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
      <div className={clsx(s.postDetails, isShowOnlyComments && s.hidden)}>
        <UserBanner
          actions={actions}
          avatar={item.avatarOwner}
          className={s.header}
          name={item.username}
        />
        <Carousel className={s.slider} imagesUrl={item.images} />
        <PostInfoAdditional
          avatars={mockComments.lastThreeLikes}
          className={s.footer}
          datePost={item.createdAt}
          isActiveCommentForm={openMobileCommentForm}
          likesCount={2243}
          toggleShowCommentForm={toggleShowCommentForm}
        />
        <Typography
          asComponent="button"
          className={s.viewComments}
          onClick={() => setIsShowOnlyComments(true)}
          variant="small"
        >
          {`${t.pages.post.veiwComments} (${mockComments.items.length})`}
        </Typography>
        <CommentsList
          className={s.content}
          classNameAvatar={s.hidden}
          comments={mockComments.items}
          isShortenComments
          maxMobileComments={2}
          postItem={item}
          userId={data?.id}
        />
        {isAuth && (
          <PublishCommentForm className={clsx(s.form, openMobileCommentForm && s.mobileForm)} />
        )}
      </div>
      <CommentsDetails
        className={clsx(!isShowOnlyComments && s.hidden)}
        item={item}
        onHide={() => setIsShowOnlyComments(false)}
        userId={data?.id}
      />
    </>
  )
}
