import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, getProducts } from "./slices";

const INITIAL_STATE = {
  data: [],
  message: null,
  success: false,
  isGetProductsLoading: false,
  isSubmitProductLoading: false,
  isDeleteProductLoading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {
    resetSuccessProduct: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isGetProductsLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isGetProductsLoading = false;
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isGetProductsLoading = false;
      })

      .addCase(deleteProduct.pending, (state, action) => {
        state.isDeleteProductLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isDeleteProductLoading = false;
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isDeleteProductLoading = false;
      });
  },
});

export default productsSlice.reducer;
