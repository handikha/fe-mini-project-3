import { createSlice } from "@reduxjs/toolkit";
import { createCategory, deleteCategory, getCategories } from "./slices";

const INITIAL_STATE = {
  data: [],
  message: null,
  isGetCategoriesLoading: false,
  isCreateCategoryLoading: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.isGetCategoriesLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isGetCategoriesLoading = false;
        state.data = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isGetCategoriesLoading = false;
      })

      .addCase(createCategory.pending, (state, action) => {
        state.isCreateCategoryLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isCreateCategoryLoading = false;
        state.message = action.payload.message;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isCreateCategoryLoading = false;
      })

      .addCase(deleteCategory.pending, (state, action) => {
        state.isCreateCategoryLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isCreateCategoryLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isCreateCategoryLoading = false;
      });
  },
});

export default categoriesSlice.reducer;
