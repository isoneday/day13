import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../data/products.js';

const initialState = {
  items: products,
  selectedCategory: 'All',
  searchKeyword: '',
  loading: false,
  error: null,
  lastStockUpdate: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    categorySelected(state, action) {
      state.selectedCategory = action.payload;
    },
    searchKeywordChanged(state, action) {
      state.searchKeyword = action.payload;
    },
    productStockUpdated(state, action) {
      const product = state.items.find((item) => item.id === action.payload.productId);

      if (!product) {
        return;
      }

      product.stock = Math.max(0, action.payload.stock);
      state.lastStockUpdate = action.payload.updatedAt;
    },
  },
});

export const { categorySelected, productStockUpdated, searchKeywordChanged } =
  productsSlice.actions;

export default productsSlice.reducer;
