import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Images = {
  imageURL: string
  uploadId: string
}
type PostsState = {
  images: Images[]
}

const initialState: PostsState = {
  images: [],
}

const postsSlice = createSlice({
  initialState,
  name: 'posts',
  reducers: {
    addImage(state, action: PayloadAction<Images>) {
      state.images.push(action.payload)
    },
    removeImage(state, action: PayloadAction<string>) {
      state.images = state.images.filter(image => image.uploadId !== action.payload)
    },
    setImages(state, action: PayloadAction<Images[]>) {
      state.images = action.payload
    },
  },
})

export const postsActions = postsSlice.actions
export const postsReducer = postsSlice.reducer
