import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (payload, { rejectWithValue }) => {
    try {
      const { sort, page, limit } = payload;
      const { data } = await api.get(
        `/categories?page=${page}&limit=${limit}&sort=${sort}`
      );
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
      // Toast.success("Success create category");
      return data;
    } catch (error) {
      console.error(error.response.data.message);
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        "/categories/" + encodeURI(payload.id),
        payload
      );
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete("/categories/" + encodeURI(payload));
      // Toast.success("Category deleted successfully");
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resetSuccessCategory = () => ({
  type: "categories/resetSuccessCategory",
});
