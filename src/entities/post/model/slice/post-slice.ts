import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  CroppedImage,
  CurrentWindow,
  DraftPost,
  PostsState,
  UpdateImageModel,
} from '../types/postSlice.types'

const initialState: PostsState = {
  croppedImages: [],
  images: [],
  imagesWithFilters: [],
  window: 'upload',
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
    initDraftPost(state, action: PayloadAction<DraftPost>) {
      const { croppedImages, images, imagesWithFilters, window } = action.payload

      state.window = window
      state.images = images.map(el => ({
        aspect: 0,
        crop: { x: 0, y: 0 },
        croppedAreaPixels: null,
        imageURL: URL.createObjectURL(el),
        uploadId: null,
        zoom: 1,
      }))

      state.croppedImages = croppedImages.map(el => ({
        filter: 'image_filter--normal',
        imageURL: URL.createObjectURL(el),
      }))

      state.imagesWithFilters = imagesWithFilters.map(el => ({ imageURL: URL.createObjectURL(el) }))
    },
    removeImage(state, action: PayloadAction<string>) {
      state.images = state.images.filter(image => image.imageURL !== action.payload)
    },
    resetAllImages(state) {
      state.images = []
      state.croppedImages = []
      state.imagesWithFilters = []
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
    setCroppedImages(state, action: PayloadAction<Blob[]>) {
      state.croppedImages = action.payload.map(el => ({
        filter: 'image_filter--normal',
        imageURL: URL.createObjectURL(el),
      }))
    },
    setImages(state, action: PayloadAction<Blob[]>) {
      state.images = action.payload.map(el => ({
        aspect: 0,
        crop: { x: 0, y: 0 },
        croppedAreaPixels: null,
        imageURL: URL.createObjectURL(el),
        uploadId: null,
        zoom: 1,
      }))
    },
    setImagesWithFilters(state, action: PayloadAction<Blob[]>) {
      state.imagesWithFilters = action.payload.map(el => ({ imageURL: URL.createObjectURL(el) }))
    },
    setWindow(state, action: PayloadAction<CurrentWindow>) {
      state.window = action.payload
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
