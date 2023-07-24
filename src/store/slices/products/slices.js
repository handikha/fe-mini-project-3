import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const { category_id, page, sort, limit } = payload;
      const PARAMETER = `page=${page}&limit=${limit}&category_id=${category_id}&sort=${sort}`;
      const { data } = await api.get("/products?" + encodeURI(PARAMETER));
      return data.data;
    } catch (error) {}
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete("/products/" + encodeURI(payload));
      // Toast.success("Category deleted successfully");
    } catch (error) {
      // Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const resetSuccessProduct = () => ({
  type: "products/resetSuccessProduct",
});
