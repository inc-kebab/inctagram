import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type CroppedAreaPixels = {
  height: number
  width: number
  x: number
  y: number
}

export type ImageObj = {
  aspect: number
  croppedAreaPixels?: CroppedAreaPixels
  imageURL: string
  uploadId?: string
}

export type ImageObjWithFilter = ImageObj & {
  filter: string
}

type PostsState = {
  images: ImageObjWithFilter[]
}

const initialState: PostsState = {
  images: [],
}

const postsSlice = createSlice({
  initialState,
  name: 'posts',
  reducers: {
    addImage(state, action: PayloadAction<ImageObj>) {
      state.images.push({ ...action.payload, filter: 'normal' })
    },
    removeImage(state, action: PayloadAction<string>) {
      state.images = state.images.filter(image => image.imageURL !== action.payload)
    },
    resetImages(state) {
      state.images = []
    },
    setFilterToImage(state, action: PayloadAction<{ filter: string; imageUrl: string }>) {
      state.images = state.images.map(image => {
        if (image.imageURL === action.payload.imageUrl) {
          return { ...image, filter: action.payload.filter }
        }

        return image
      })
    },
    setImages(state, action: PayloadAction<ImageObj[]>) {
      state.images = action.payload.map(image => {
        return {
          ...image,
          filter: 'normal',
        }
      })
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
