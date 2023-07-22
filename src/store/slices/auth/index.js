import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { login, keepLogin } from "./slices";

// @initial state
const INITIAL_STATE = {
  //@loading state
  isLoginLoading: false,
  isKeepLoginLoading: false,
  isKeepLogin: false,

  //@login state
  id: null,
  fullName: "",
  username: "",
  email: "",
  phone: "",
  role: 1,
  status: "",
  profileImg: "",
};

//@Auth slieces
// @create slice
const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: {
    //@Login Slices
    [login.pending]: (state, action) => {
      state.isLoginLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isLoginLoading: false,
        id: action.payload?.id,
        username: action.payload?.username,
        email: action.payload?.email,
        phone: action.payload?.phone,
        role: action.payload?.role,
        status: action.payload?.status,
        profileImg: action.payload?.profileImg,
        isKeepLogin: true,
      });
    },
    [login.rejected]: (state, action) => {
      state.isLoginLoading = false;
      state = Object.assign(state, INITIAL_STATE);
    },

    //@Keep login
    [keepLogin.pending]: (state, action) => {
      state.isKeepLoginLoading = true;
    },
    [keepLogin.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        id: action.payload?.id,
        username: action.payload?.username,
        email: action.payload?.email,
        phone: action.payload?.phone,
        role: action.payload?.role,
        status: action.payload?.status,
        profileImg: action.payload?.profileImg,
        isKeepLogin: true,
        isKeepLoginLoading: false,
      });
    },
    [keepLogin.rejected]: (state, action) => {
      state = Object.assign(state, {
        isKeepLoginLoading: false,
        isKeepLogin: false,
      });
    },
  },
});

export default authSlice.reducer;
