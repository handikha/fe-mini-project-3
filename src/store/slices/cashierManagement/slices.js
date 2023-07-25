import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

//@Get cashier Info async thunk function
export const getCashierInfo = createAsyncThunk(
  "cashierManagement/getCashierInfo",
  async (payload, { rejectWithValue }) => {
    try {
      // @generate parameter
      const { status, sort, page } = payload;

      const PARAMETER = `status=${status}&sort=${sort}&page=${page}`;
      const { data } = await api.get(
        "/cashier-management?" + encodeURI(PARAMETER)
      );
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

//@Change cashier status async thunk function
export const changeCashierStatus = createAsyncThunk(
  "cashierManagement/changeCashierStatus",
  async (payload, { rejectWithValue }) => {
    try {
      // @generate parameter
      const { id, status } = payload;

      const { data } = await api.patch(
        `/cashier-management/${id}?status=${status}`
      );
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "cashierManagement/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      // @generate parameter
      const { id, profile } = payload;
      const { data } = await api.put(`/cashier-management/${id}`, profile);
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const registerCashier = createAsyncThunk(
  "cashierManagement/registerCashier",
  async (payload, { rejectWithValue }) => {
    try {
      // @generate parameter
      const { data } = await api.post(`/cashier-management/`, payload);
      Toast.success(data.message);
      return data.data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);
