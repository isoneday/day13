import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice.js';
import cartReducer from '../features/cart/cartSlice.js';
import notificationsReducer from '../features/notifications/notificationsSlice.js';
import voucherReducer from '../features/voucher/voucherSlice.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    notifications: notificationsReducer,
    voucher: voucherReducer,
  },
});
