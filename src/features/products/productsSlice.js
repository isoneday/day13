import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../data/products.js';

const initialState = {
  items: products,
  selectedCategory: 'All',
  searchKeyword: '',
  loading: false,
  error: null,
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
  },
});

export const { categorySelected, searchKeywordChanged } = productsSlice.actions;

export default productsSlice.reducer;
