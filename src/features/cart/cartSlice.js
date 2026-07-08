import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  checkoutStep: 'cart',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartItemAdded(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          state.error = `${product.name} has only ${product.stock} in stock.`;
          return;
        }

        existingItem.quantity += 1;
        state.error = null;
        return;
      }

      if (product.stock < 1) {
        state.error = `${product.name} is out of stock.`;
        return;
      }

      state.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        quantity: 1,
      });
      state.error = null;
    },
    cartItemRemoved(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.error = null;
    },
    cartCleared(state) {
      state.items = [];
      state.checkoutStep = 'cart';
      state.error = null;
    },
    checkoutStarted(state) {
      if (state.items.length === 0) {
        state.error = 'Add at least one product before checkout.';
        return;
      }

      state.checkoutStep = 'checkout';
      state.error = null;
    },
    cartErrorCleared(state) {
      state.error = null;
    },
  },
});

export const {
  cartItemAdded,
  cartItemRemoved,
  cartCleared,
  checkoutStarted,
  cartErrorCleared,
} = cartSlice.actions;

export default cartSlice.reducer;
