import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import cashierManagementReducer from "./slices/cashierManagement";

const store = configureStore({
  reducer: { auth: authReducer, cashierManagement: cashierManagementReducer },
});

export default store;
