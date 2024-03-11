import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { UpdateProfileArgs } from '../model/types/profile.types'

type Profile = {
  profile: UpdateProfileArgs | null
}

const initialState: Profile = {
  profile: null,
}

const slice = createSlice({
  initialState,
  name: 'profileSlice',
  reducers: {
    setProfile: (state, action: PayloadAction<UpdateProfileArgs>) => {
      state.profile = action.payload
    },
  },
})

export const profileReducers = slice.reducer
export const profileActions = slice.actions
