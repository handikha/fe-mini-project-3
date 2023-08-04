import {createSlice} from "@reduxjs/toolkit";
import {getTransactions} from "./slices";

const INITIAL_STATE = {
    data: [],
    message: null,
    success: false,
    total_pages: null,
    current_page: null,
    next_page: null,
    isGetTransactionsLoading: false,
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: INITIAL_STATE,
    reducers: {
        resetSuccessTransaction: (state, action) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.pending, (state, action) => {
                state.isGetTransactionsLoading = true;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.isGetTransactionsLoading = false;
                state.data = action.payload.data;
                state.total_pages = action.payload.total_pages;
                state.current_page = action.payload.current_page;
                state.next_page = action.payload.next_page;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.isGetTransactionsLoading = false;
            });
    },
});

export default transactionsSlice.reducer;