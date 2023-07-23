import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import categoriesReducer from "./slices/categories";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
  },
});

export default store;
