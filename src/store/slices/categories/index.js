import { createSlice } from "@reduxjs/toolkit";
import { createCategory, getCategories } from "./slices";

const INITIAL_STATE = {
  data: [],
  isCategoriesLoading: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.isCategoriesLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isCategoriesLoading = false;
        state.data = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isCategoriesLoading = false;
      })

      .addCase(createCategory.pending, (state, action) => {
        state.isCategoriesLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isCategoriesLoading = false;
        state.data = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isCategoriesLoading = false;
      });
  },
});

export default categoriesSlice.reducer;
