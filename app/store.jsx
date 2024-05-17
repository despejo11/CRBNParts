import userReducer from '../src/features/user/userSlice'
import { configureStore } from '@reduxjs/toolkit'

const preloadedState = {
  user: {
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    password: localStorage.getItem('userPassword') || '',
    isRegistered:
      localStorage.getItem('isRegistered') === 'true' ? true : false,
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' ? true : false,
  },
}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  localStorage.setItem('userName', store.getState().user.name)
  localStorage.setItem('userEmail', store.getState().user.email)
  localStorage.setItem('userPassword', store.getState().user.password)
  localStorage.setItem('isRegistered', store.getState().user.isRegistered)
  localStorage.setItem('isLoggedIn', store.getState().user.isLoggedIn)
})
export default store
