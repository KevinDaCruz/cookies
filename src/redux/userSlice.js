import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  expiresAt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.expiresAt = action.payload.expiresAt;
    },
    logout(state) {
      state.token = null;
      state.expiresAt = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
