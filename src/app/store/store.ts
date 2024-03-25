import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { postsReducer } from '@/feature/post/api/post-slice'
import { baseApi } from '@/shared/api/base-api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),

  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    posts: postsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
