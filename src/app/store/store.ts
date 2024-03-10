import { profileReducers } from '@/feature/profile/api/profile-slice'
import { baseApi } from '@/shared/api/base-api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    profile: profileReducers,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
