import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getTransactions = createAsyncThunk(
    "transactions/getTransactions",
    async (payload, {rejectWithValue}) => {
        try {
            const {page, limit} = payload;
            const {data} = await api.get(
                `/transactions?page=${page}&limit=${limit}`
            );
            return data;
        } catch (error) {
            Toast.error(error.response.data.message);
            return rejectWithValue(error.response.data.err);
        }
    }
);

export const resetSuccessTransaction = () => ({
    type: "transactions/resetSuccessTransaction",
});
