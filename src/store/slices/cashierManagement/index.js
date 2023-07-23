import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { getCashierInfo, changeCashierStatus, registerCashier } from "./slices";

// @initial state
const INITIAL_STATE = {
  //@loading state
  isGetCashierInfoLoading: false,
  isChangeCashierStatusLoading: false,
  isRegisterCashierLoading: false,

  //@user state
  allCashier: [],

  //@Pagination
  curentCashierPage: 1,
  totalCashierPage: "",
};

//@Auth slieces
const cashierManagement = createSlice({
  name: "cashierManagement",
  initialState: INITIAL_STATE,
  extraReducers: {
    //@Get cashier info
    [getCashierInfo.pending]: (state, action) => {
      state.isGetCashierInfoLoading = true;
    },
    [getCashierInfo.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isGetCashierInfoLoading: false,
        allCashier: action.payload?.result,
        curentCashierPage: action.payload?.currentPage,
        totalCashierPage: action.payload?.totalPages,
      });
    },
    [getCashierInfo.rejected]: (state, action) => {
      state.isLoginLoading = false;
      state = Object.assign(state, INITIAL_STATE);
    },

    [changeCashierStatus.pending]: (state, action) => {
      state.isGetCashierInfoLoading = true;
    },
    [changeCashierStatus.fulfilled]: (state, action) => {
      state.isGetCashierInfoLoading = false;
    },
    [changeCashierStatus.rejected]: (state, action) => {
      state.isGetCashierInfoLoading = true;
    },

    [registerCashier.pending]: (state, action) => {
      state.isRegisterCashierLoading = true;
    },
    [registerCashier.fulfilled]: (state, action) => {
      state.isRegisterCashierLoading = false;
    },
    [registerCashier.rejected]: (state, action) => {
      state.isRegisterCashierLoading = true;
    },
  },
});

export default cashierManagement.reducer;
