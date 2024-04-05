export type Images = {
  fileSize: number;
  height: number;
  uploadId: string;
  url: string;
  width: number;
}

export type Owner = {
  firstName: string;
  lastName: string;
}

export type Items = {
  avatarOwner: string;
  createdAt: string;
  description: string;
  id: number;
  images: Images[];
  location: string;
  owner: Owner;
  ownerId: number;
  updatedAt: string;
  username: string;
}

export type GetPostsResponse = {
  cursor: number;
  hasMore: boolean
  items: Items[];
  pageSize: number;
  pagesCount: number;
  totalCount: number;
}

export type  GetPublicProfileResponse = {
  aboutMe: string
  avatars: Avatars
  city: string
  createdAt: string
  dateOfBirth: string
  firstname: string
  hasMore: boolean
  id: number
  lastname: string
  username: string
}

type  Avatars = {
  "avatar-medium": AvatarMedium
  "avatar-thumbnail": AvatarThumbnail
}

type  AvatarMedium = {
  fileSize: number
  height: number
  url: string
  width: number
}

type  AvatarThumbnail = {
  fileSize: number
  height: number
  url: string
  width: number
}

export type PublicParamsBase = {
  cursor?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: "asc" | "desc"
}

export type PublicParams =  PublicParamsBase | undefined

export type GetAllUsersParams = PublicParamsBase & {
  userId: number;
};
