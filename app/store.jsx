import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../src/features/user/userSlice'
import cartReducer from '../src/features/cart/cartSlice'

const preloadedState = {
  user: {
    name: localStorage.getItem('UserName') || '',
    email: localStorage.getItem('UserEmail') || '',
    password: localStorage.getItem('UserPassword') || '',
    isRegistered: localStorage.getItem('IsRegistered') === 'true',
    isLoggedIn: localStorage.getItem('IsLoggedIn') === 'true',
  },
  cart: {
    items: JSON.parse(localStorage.getItem('CartItems')) || [],
    totalQuantity: JSON.parse(localStorage.getItem('CartTotalQuantity')) || 0,
    totalPrice: JSON.parse(localStorage.getItem('CartTotalPrice')) || 0,
  },
}

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  localStorage.setItem('UserName', store.getState().user.name)
  localStorage.setItem('UserEmail', store.getState().user.email)
  localStorage.setItem('UserPassword', store.getState().user.password)
  localStorage.setItem('IsRegistered', store.getState().user.isRegistered)
  localStorage.setItem('IsLoggedIn', store.getState().user.isLoggedIn)

  localStorage.setItem('CartItems', JSON.stringify(store.getState().cart.items))
  localStorage.setItem(
    'CartTotalQuantity',
    JSON.stringify(store.getState().cart.totalQuantity)
  )
  localStorage.setItem(
    'CartTotalPrice',
    JSON.stringify(store.getState().cart.totalPrice)
  )
})

export default store
