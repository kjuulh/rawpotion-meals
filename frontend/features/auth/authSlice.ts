import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@lib/redux/store";

interface AuthState {
  returnUrl?: string;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setReturnUrl: (state, action: PayloadAction<string>) => {
      state.returnUrl = action.payload;
    },
    resetAuth: (state) => {
      state = { ...initialState };
    },
  },
});

export const { setReturnUrl, resetAuth } = authSlice.actions;

export const selectReturnUrl = (state: AppState): string | undefined =>
  state.auth.returnUrl;

export default authSlice.reducer;
