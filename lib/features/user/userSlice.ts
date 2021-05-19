import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import firebase from "firebase/app";
import { AppState } from "../../redux/store";

export interface IsLoggedInUserState {
  state: "logged-in";
  userId: string;
  email: string;
  status: "idle";
}
export interface UnknownUserState {
  state: "unknown";
  status: "idle";
}

export interface IsNotLoggedInUserState {
  state: "not-logged-in";
  status: "idle" | "loading" | "failed";
  userId: undefined;
  email: undefined;
}

type UserState =
  | UnknownUserState
  | IsLoggedInUserState
  | IsNotLoggedInUserState;

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}
export const registerAsync = createAsyncThunk(
  "user/register",
  async (input: RegisterInput): Promise<IsLoggedInUserState> => {
    const userCreationResponse = await firebase
      .auth()
      .createUserWithEmailAndPassword(input.email, input.password);

    const { uid, email } = userCreationResponse.user;
    return { userId: uid, email, status: "idle", state: "logged-in" };
  }
);

export interface LoginInput {
  email: string;
  password: string;
}
export const loginAsync = createAsyncThunk(
  "user/login",
  async (input: LoginInput): Promise<IsLoggedInUserState> => {
    await firebase.auth().setPersistence("local");

    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(input.email, input.password);

    const { uid, email } = userCredential.user;
    return { userId: uid, email, status: "idle", state: "logged-in" };
  }
);

const initialState: UserState = {
  state: "unknown",
  status: "idle",
};

export const signOutAsync = createAsyncThunk(
  "user/sign-out",
  async (): Promise<IsNotLoggedInUserState> => {
    await firebase.auth().signOut();

    return {
      userId: undefined,
      email: undefined,
      status: "idle",
      state: "not-logged-in",
    };
  }
);

export const userSlice = createSlice<
  UnknownUserState | IsNotLoggedInUserState | IsLoggedInUserState,
  {
    userIsAlreadySignedIn: (
      state: IsNotLoggedInUserState | IsLoggedInUserState,
      action: PayloadAction<{ email: string; userId: string }>
    ) => void;
  },
  "user"
>({
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
      state = action.payload;
    });
  },
});

export const { userIsAlreadySignedIn } = userSlice.actions;

export const selectUser = (state: AppState) => state.userReducer;

export default userSlice.reducer;
