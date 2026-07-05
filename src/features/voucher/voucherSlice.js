import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  code: '',
  status: 'idle',
  discountPercent: 0,
  message: '',
  error: null,
};

const voucherSlice = createSlice({
  name: 'voucher',
  initialState,
  reducers: {
    voucherInputChanged(state, action) {
      state.code = action.payload;
      state.status = action.payload.trim() ? 'typing' : 'idle';
      state.discountPercent = 0;
      state.message = '';
      state.error = null;
    },
    voucherValidationStarted(state) {
      state.status = 'validating';
      state.discountPercent = 0;
      state.message = 'Checking voucher code...';
      state.error = null;
    },
    voucherValidationSucceeded(state, action) {
      state.status = 'valid';
      state.discountPercent = action.payload.discountPercent;
      state.message = action.payload.message;
      state.error = null;
    },
    voucherValidationFailed(state, action) {
      state.status = 'invalid';
      state.discountPercent = 0;
      state.message = action.payload.message;
      state.error = null;
    },
    voucherValidationErrored(state, action) {
      state.status = 'error';
      state.discountPercent = 0;
      state.message = '';
      state.error = action.payload;
    },
    voucherCleared() {
      return initialState;
    },
  },
});

export const {
  voucherInputChanged,
  voucherValidationStarted,
  voucherValidationSucceeded,
  voucherValidationFailed,
  voucherValidationErrored,
  voucherCleared,
} = voucherSlice.actions;

export default voucherSlice.reducer;
