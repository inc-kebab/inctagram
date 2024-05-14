import { RootState } from '@/app'

import { CurrentWindow } from '../types/postSlice.types'

export const getImagesByWindow = (window: CurrentWindow) => (state: RootState) => {
  switch (window) {
    case 'filter': {
      return state.posts.croppedImages
    }
    default: {
      return []
    }
  }
}
