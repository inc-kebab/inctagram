import { CommentData } from '@/entities/comment'

const items: CommentData[] = [
  {
    commentText:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',
    idUser: 3,
    likesCount: 0,
    name: 'Ilon Mask',
    time: '2024-02-27T16:57:15.304Z',
  },
  {
    commentText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    idUser: 2,
    like: true,
    likesCount: 5,
    name: 'Mark Zuckerberg',
    time: '2024-03-02T16:57:15.304Z',
  },
  {
    commentText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    idUser: 3,
    likesCount: 0,
    name: 'Chat_GPT4',
    time: '2024-03-11T16:57:15.304Z',
  },
  {
    commentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    idUser: 4,
    likesCount: 3,
    name: 'Bot',
    time: '2024-03-19T16:57:15.304Z',
  },
]

const lastThreeLikes = ['', '', '']

const imagesUrl = [
  { url: 'https://dummyimage.com/490x562/06a4ac' },
  { url: 'https://dummyimage.com/452x452/06a4ac' },
  { url: 'https://dummyimage.com/350x562/06a4ac' },
  { url: 'https://dummyimage.com/490x562/06a4ac' },
  { url: 'https://dummyimage.com/490x562/06a4ac' },
]

export const mockComments = { imagesUrl, items, lastThreeLikes }
