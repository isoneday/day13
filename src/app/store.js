import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice.js';
import cartReducer from '../features/cart/cartSlice.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
