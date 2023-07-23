import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/categories");
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/categories", payload);
      Toast.success("Success create category");
      return data.message;
    } catch (error) {
      // console.error(error);
      Toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
