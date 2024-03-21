export type SelectItems = '' | 'delete' | 'edit'

export type CommentData = {
  avatarUrl?: string
  commentText: string
  idUser: number
  like?: boolean
  likesCount?: number
  name: string
  time: string
}
