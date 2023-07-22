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
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const keepLogin = createAsyncThunk(
  "auth/keepLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
