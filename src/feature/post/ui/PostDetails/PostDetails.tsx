import { useState } from 'react'

import {
  CommentData,
  HeaderPostComments,
  PostComments,
  PostInfo,
  SelectItems,
} from '@/entities/post'
import { DeletePostDialog, PostItem, PublishCommentForm } from '@/feature/post'
import { Carousel } from '@/shared/ui/Carousel'

import s from './PostDetails.module.scss'

export const PostDetails = () => {
  const [selectItem, setSelectItem] = useState<SelectItems>('')
  const comments: CommentData[] = [
    {
      avatarUrl:
        'https://storage.yandexcloud.net/kebab-inctagram/media/users/18/avatars/18-1710690099221-avatar-medium.webp',
      commentText:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',
      idUser: 3,
      likesCount: 0,
      name: 'Ilon Mask',
      time: '2024-02-27T16:57:15.304Z',
    },
    {
      avatarUrl:
        'https://storage.yandexcloud.net/kebab-inctagram/media/users/18/avatars/18-1710599512573-avatar-medium.webp',
      commentText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      idUser: 2,
      like: true,
      likesCount: 5,
      name: 'Mark Zuckerberg',
      time: '2024-03-02T16:57:15.304Z',
    },
    {
      avatarUrl: '',
      commentText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      idUser: 3,
      likesCount: 0,
      name: 'Chat_GPT4',
      time: '2024-03-11T16:57:15.304Z',
    },
    {
      avatarUrl: '',
      commentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      idUser: 4,
      likesCount: 3,
      name: 'Bot',
      time: '2024-03-19T16:57:15.304Z',
    },
  ]

  const postItem: PostItem = {
    avatarOwner:
      'https://storage.yandexcloud.net/kebab-inctagram/media/users/18/avatars/18-1710876282367-avatar-medium.webp',
    createdAt: '2024-02-07T16:57:15.304Z',
    description:
      'Gotham City... This city is steeped in darkness and despair. When I see its rain-soaked alleyways and the looks of hopelessness on the faces of its inhabitants, I understand that this is a place where evil knows no bounds. Every corner here is permeated with crime, corruption, and hopelessness.',
    id: 1,
    images: [
      {
        fileSize: 300,
        height: 300,
        uploadId: 'string',
        url: 'https://example.com/image.jpg',
        width: 300,
      },
    ],
    location: 'location',
    owner: {
      firstName: 'firstName',
      lastName: 'lastName',
    },
    ownerId: 1,
    updatedAt: '2024-03-07T16:57:15.304Z',
    username: 'mr. Bruce',
  }

  const lastThreeLikes = [
    'https://storage.yandexcloud.net/kebab-inctagram/media/users/18/avatars/18-1710690099221-avatar-medium.webp',
    'https://storage.yandexcloud.net/kebab-inctagram/media/users/!!!!битая_ссылка',
    'https://storage.yandexcloud.net/kebab-inctagram/media/users/18/avatars/18-1710599512573-avatar-medium.webp',
  ]

  const mockedImagesUrl = [
    { url: 'https://dummyimage.com/490x562/06a4ac' },
    { url: 'https://dummyimage.com/452x452/06a4ac' },
    { url: 'https://dummyimage.com/350x562/06a4ac' },
    { url: 'https://dummyimage.com/490x562/06a4ac' },
    { url: 'https://dummyimage.com/490x562/06a4ac' },
  ]

  return (
    <>
      <div className={s.postDetails}>
        <Carousel className={s.slider} imagesUrl={mockedImagesUrl} />
        <HeaderPostComments
          avatar={postItem.avatarOwner}
          className={s.header}
          name={postItem.username}
          onSelect={setSelectItem}
        />
        <PostComments className={s.content} comments={comments} postItem={postItem} />
        <PostInfo
          avatars={lastThreeLikes}
          className={s.footer}
          datePost="2024-03-07T16:57:15.304Z"
          likesCount={2243}
        />
        <PublishCommentForm className={s.form} />
      </div>
      <DeletePostDialog
        confirmCallback={() => {}}
        open={selectItem === 'delete'}
        setOpen={() => setSelectItem('')}
      />
    </>
  )
}
