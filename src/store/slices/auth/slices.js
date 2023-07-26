import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

//@login async thunk function
export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, headers } = await api.post("/auth/login", payload);

      //@get token from headers
      const token = headers.authorization.split(" ")[1];

      // @save token to local storage
      localStorage.setItem("token", token);

      Toast.success(data?.message);

      return data.data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

//@Keep login async thunk function
export const keepLogin = createAsyncThunk(
  "auth/keepLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth");
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async (payload, { rejectWithValue }) => {
    try {
      await api.patch("/auth/verify");
      return;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.err : error);
    }
  }
);

//@logout async thunk function
export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      Toast.success("Logout Successfully");
      return {};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//@forget Password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      // @generate parameter
      const { data } = await api.put(`/auth/forget-password`, payload);
      Toast.success(data.message);
      return data.data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/auth/reset-password", payload);
      Toast.success(data.message);
      return data;
    } catch (error) {
      localStorage.removeItem("token");
      Toast.error(error.response.data.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//@Change password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/auth/change-password", payload);
      Toast.success(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 500);
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error?.response?.message);
    }
  }
);
