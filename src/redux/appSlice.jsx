import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  loginData: {
    firstName: "",
    lastName: "",
    email: "",
    phonenumber: "",
    dob: "",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoginData: (state, action) => {
      state.loginData = action.payload;
    },
    clearLoginData: (state) => {
      state.loginData = initialState.loginData;
    },
  },
});

export const { setLogin, setLoginData, clearLoginData } = appSlice.actions;

export const selectIsLoggedIn = (state) => state.app.isLoggedIn;
export const selectLoginData = (state) => state.app.loginData;

export default appSlice.reducer;
