import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase/app";
import { AppState } from "@lib/redux/store";
import { loginAsync } from "./loginAsync";
import { registerAsync } from "./registerAsync";

export interface UserState {
  state: "not-logged-in" | "logged-in" | "unknown";
  status: "idle" | "loading" | "failed";
  userId?: string;
  email?: string;
}

const initialState: UserState = {
  state: "unknown",
  status: "idle",
};

export const signOutAsync = createAsyncThunk(
  "user/sign-out",
  async (_, thunkAPI): Promise<UserState> => {
    await firebase.auth().signOut();

    thunkAPI.dispatch({
      type: "reset",
    });

    return {
      userId: undefined,
      email: undefined,
      status: "idle",
      state: "not-logged-in",
    };
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userIsAlreadySignedIn: (
      state,
      action: PayloadAction<{ email: string; userId: string }>
    ) => {
      state.status = "idle";
      state.state = "logged-in";
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
    resetUser: (state) => {
      state.status = "idle";
      state.state = "not-logged-in";
      state.userId = undefined;
      state.email = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.state = "logged-in";
      state.status = "idle";
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    });
    builder.addCase(loginAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.status = "idle";
      state.state = "logged-in";
    });

    builder.addCase(signOutAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signOutAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "unknown";
      state.email = "";
      state.userId = "";
    });
  },
});

export const { userIsAlreadySignedIn, resetUser } = userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
