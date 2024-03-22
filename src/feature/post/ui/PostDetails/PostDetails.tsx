import { useState } from 'react'

import { CommentsList } from '@/entities/comment'
import { HeaderPost, PostActionMode, PostInfo } from '@/entities/post'
import { PublishCommentForm, mockComments } from '@/feature/comment'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Carousel } from '@/shared/ui/Carousel'
import { ConfirmDialog } from '@/widgets/dialogs'

import s from './PostDetails.module.scss'

import { PostItem } from '../../model/types/post.types'

type Props = {
  item: PostItem
}

export const PostDetails = ({ item }: Props) => {
  const { t } = useTranslation()

  const [selectItem, setSelectItem] = useState<PostActionMode>('')

  return (
    <>
      <div className={s.postDetails}>
        <Carousel className={s.slider} imagesUrl={mockComments.imagesUrl} />
        <HeaderPost
          avatar={item.avatarOwner}
          className={s.header}
          name={item.username}
          onSelect={setSelectItem}
        />
        <CommentsList className={s.content} comments={mockComments.items} postItem={item} />
        <PostInfo
          avatars={mockComments.lastThreeLikes}
          className={s.footer}
          datePost="2024-03-07T16:57:15.304Z"
          likesCount={2243}
        />
        <PublishCommentForm className={s.form} />
      </div>
      <ConfirmDialog
        confirmCallback={() => {}}
        content={t.pages.post.deletePostQuestion}
        onOpenChange={() => setSelectItem('')}
        open={selectItem === 'delete'}
        title={t.pages.post.deletePost}
      />
    </>
  )
}
