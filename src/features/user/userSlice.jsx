import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', email: '', password: '', isLoggedIn: false },
  reducers: {
    register: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.password = action.payload.password
      state.isRegistered = true
      state.isLoggedIn = true
    },
    login: (state, action) => {
      state.name = action.payload.name
      state.password = action.payload.password
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false
    },
  },
})

export const { register, login, logout } = userSlice.actions

export default userSlice.reducer
