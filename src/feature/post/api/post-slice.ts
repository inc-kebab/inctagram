import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ImageObj = {
  aspect: number
  croppedAreaPixels?: any
  imageURL: string
  uploadId?: string
}

type PostsState = {
  images: ImageObj[]
}

const initialState: PostsState = {
  images: [],
}

const postsSlice = createSlice({
  initialState,
  name: 'posts',
  reducers: {
    addImage(state, action: PayloadAction<ImageObj>) {
      state.images.push(action.payload)
    },
    removeImage(state, action: PayloadAction<string>) {
      state.images = state.images.filter(image => image.imageURL !== action.payload)
    },
    setImages(state, action: PayloadAction<ImageObj[]>) {
      state.images = action.payload
    },
    updateImage(state, action: PayloadAction<{ currentIndex: number; uploadId: string }>) {
      state.images[action.payload.currentIndex] = {
        ...state.images[action.payload.currentIndex],
        uploadId: action.payload.uploadId,
      }
    },
  },
})

export const postsActions = postsSlice.actions
export const postsReducer = postsSlice.reducer
