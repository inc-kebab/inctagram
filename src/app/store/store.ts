import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { postsReducer } from '@/entities/post'
import { baseApi } from '@/shared/api'
import { configureStore } from '@reduxjs/toolkit'
import { Context, createWrapper } from 'next-redux-wrapper'

const makeStore = (context?: Context) => {
  return configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: { extraArgument: context } }).concat(baseApi.middleware),
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      posts: postsReducer,
    },
  })
}

type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const wrapper = createWrapper(makeStore, { debug: true })
