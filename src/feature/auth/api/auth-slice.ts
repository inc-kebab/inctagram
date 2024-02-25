import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type AuthStateType = {
  error: string | undefined
}

const initialState: AuthStateType = {
  error: undefined,
}

const slice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload
    },
  },
})

export const authReducers = slice.reducer
export const authActions = slice.actions
