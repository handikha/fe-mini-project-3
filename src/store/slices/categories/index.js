import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./slices";

const INITIAL_STATE = {
  data: [],
  message: null,
  success: false,
  total_pages: null,
  current_page: null,
  next_page: null,
  isGetCategoriesLoading: false,
  isSubmitCategoryLoading: false,
  isDeleteCategoryLoading: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  reducers: {
    resetSuccessCategory: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.isGetCategoriesLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isGetCategoriesLoading = false;
        state.data = action.payload.data;
        state.total_pages = action.payload.total_pages;
        state.current_page = action.payload.current_page;
        state.next_page = action.payload.next_page;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isGetCategoriesLoading = false;
      })

      .addCase(createCategory.pending, (state, action) => {
        state.isSubmitCategoryLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isSubmitCategoryLoading = false;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isSubmitCategoryLoading = false;
        state.message = action.payload;
      })

      .addCase(updateCategory.pending, (state, action) => {
        state.isSubmitCategoryLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isSubmitCategoryLoading = false;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isSubmitCategoryLoading = false;
        state.message = action.payload;
      })

      .addCase(deleteCategory.pending, (state, action) => {
        state.isDeleteCategoryLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isDeleteCategoryLoading = false;
        state.success = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isDeleteCategoryLoading = false;
      });
  },
});

export default categoriesSlice.reducer;
