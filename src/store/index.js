import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import categoriesReducer from "./slices/categories";
import productsReducer from "./slices/products";
import cashierManagementReducer from "./slices/cashierManagement";
import transactionReducer from "./slices/transactions";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cashierManagement: cashierManagementReducer,
    transactions: transactionReducer,
  },
});

export default store;
