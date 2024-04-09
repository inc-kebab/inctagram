import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { postsReducer } from '@/entities/post'
import { baseApi } from '@/shared/api/base-api'
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),

  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    posts: postsReducer,
  },
})

type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const wrapper = createWrapper<typeof store>(() => store, { debug: true })
