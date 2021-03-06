import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@lib/redux/store";
import { api, authenticateUser } from "@lib/api";
import { AuthenticationResponse } from "@lib/api/rawpotion-mealplanner-api.generated";

export interface UserState {
  state: "not-logged-in" | "logged-in" | "unknown";
  status: "idle" | "loading" | "failed";
  userId?: string | number;
  email?: string;
  accessToken?: string;
}

const initialState: UserState = {
  state: "unknown",
  status: "idle",
};

export const signOutAsync = createAsyncThunk(
    "user/sign-out",
    async (_, thunkAPI): Promise<UserState> => {
      thunkAPI.dispatch({
        type: "reset",
      });

      thunkAPI.dispatch(api.endpoints.revokeAccessToken.initiate({}))

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
      state.accessToken = undefined;
    },
    userIsSignedIn: (state, action: PayloadAction<AuthenticationResponse>) => {
      state.status = "idle";
      state.state = "logged-in";
      state.userId = action.payload.id;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signOutAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signOutAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = action.payload.state;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    });

    builder.addMatcher(authenticateUser.matchFulfilled, (state, action) => {
      if (action.payload.accessToken) {
        state.status = "idle";
        state.state = "logged-in";
        state.userId = action.payload.userId;
        state.email = action.payload.email;
        state.accessToken = action.payload.accessToken;
      }
    });
  },
});

export const {userIsAlreadySignedIn, resetUser, userIsSignedIn} =
    userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
