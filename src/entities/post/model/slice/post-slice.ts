import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CroppedImage, ImageObj, PostsState, UpdateImageModel } from '../types/postSlice.types'

const initialState: PostsState = {
  croppedImages: [],
  images: [],
  imagesWithFilters: [],
}

const postsSlice = createSlice({
  initialState,
  name: 'posts',
  reducers: {
    addImage(state, action: PayloadAction<string>) {
      state.images.push({
        aspect: 0,
        crop: { x: 0, y: 0 },
        croppedAreaPixels: null,
        imageURL: action.payload,
        uploadId: null,
        zoom: 1,
      })
    },
    removeImage(state, action: PayloadAction<string>) {
      state.images = state.images.filter(image => image.imageURL !== action.payload)
    },
    resetCroppedImages(state) {
      state.croppedImages = []
    },
    resetImages(state) {
      state.images = []
    },
    resetImagesWithFilters(state) {
      state.imagesWithFilters = []
    },
    setCroppedImages(state, action: PayloadAction<string[]>) {
      state.croppedImages = action.payload.map(el => ({
        filter: 'image_filter--normal',
        imageURL: el,
      }))
    },
    setImagesWithFilters(state, action: PayloadAction<string[]>) {
      state.imagesWithFilters = action.payload.map(el => ({ imageURL: el }))
    },
    updateFilterCroppedImage(state, action: PayloadAction<CroppedImage>) {
      const { filter, imageURL } = action.payload

      const idx = state.croppedImages.findIndex(el => el.imageURL === imageURL)

      if (idx !== -1) {
        state.croppedImages[idx] = { ...state.croppedImages[idx], filter }
      }
    },
    updateImage(state, action: PayloadAction<UpdateImageModel>) {
      const { imageURL, ...updatedEntries } = action.payload

      const imageIdx = state.images.findIndex(el => el.imageURL === imageURL)

      if (imageIdx !== -1) {
        state.images[imageIdx] = { ...state.images[imageIdx], ...updatedEntries }
      }
    },
  },
})

export const postsActions = postsSlice.actions
export const postsReducer = postsSlice.reducer
