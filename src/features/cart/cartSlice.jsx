import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: JSON.parse(localStorage.getItem('CartItems')) || [],
  totalQuantity: JSON.parse(localStorage.getItem('CartTotalQuantity')) || 0,
  totalPrice: JSON.parse(localStorage.getItem('CartTotalPrice')) || 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      const totalNewQuantity = existingItem
        ? existingItem.quantity + action.payload.quantity
        : action.payload.quantity

      if (totalNewQuantity > 10) {
        return
      }

      state.totalQuantity += action.payload.quantity
      state.totalPrice += action.payload.price * action.payload.quantity

      if (!existingItem) {
        state.items.push(action.payload)
      } else {
        existingItem.quantity += action.payload.quantity
      }

      localStorage.setItem('CartItems', JSON.stringify(state.items))
      localStorage.setItem(
        'CartTotalQuantity',
        JSON.stringify(state.totalQuantity)
      )
      localStorage.setItem('CartTotalPrice', JSON.stringify(state.totalPrice))
    },

    removeItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity
        state.totalPrice -= existingItem.price * existingItem.quantity
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        )
        localStorage.setItem('CartItems', JSON.stringify(state.items))
        localStorage.setItem(
          'CartTotalQuantity',
          JSON.stringify(state.totalQuantity)
        )
        localStorage.setItem('CartTotalPrice', JSON.stringify(state.totalPrice))
      }
    },

    updateItemQuantity: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      const totalNewQuantity = action.payload.quantity

      if (totalNewQuantity > 10) {
        return
      }

      state.totalQuantity += action.payload.quantity - existingItem.quantity
      state.totalPrice +=
        existingItem.price * (action.payload.quantity - existingItem.quantity)
      existingItem.quantity = action.payload.quantity
      localStorage.setItem('CartItems', JSON.stringify(state.items))
      localStorage.setItem(
        'CartTotalQuantity',
        JSON.stringify(state.totalQuantity)
      )
      localStorage.setItem('CartTotalPrice', JSON.stringify(state.totalPrice))
    },

    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
      localStorage.removeItem('CartItems')
      localStorage.removeItem('CartTotalQuantity')
      localStorage.removeItem('CartTotalPrice')
    },

    checkItemInCart: (state, action) => {
      return state.items.some((item) => item.id === action.payload)
    },
  },
})

export const {
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
  checkItemInCart,
} = cartSlice.actions

export default cartSlice.reducer
