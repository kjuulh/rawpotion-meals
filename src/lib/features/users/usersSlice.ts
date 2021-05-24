import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../redux/store";
import { User } from "./user";
import { getUsersAsync } from "./getUsersAsync";

interface UsersState {
  state: "not-called" | "called";
  status: "idle" | "loading" | "failed";
  users: User[];
}

const initialState: UsersState = {
  state: "not-called",
  status: "idle",
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.pending, (state) => {
      state.state = "called";
      state.status = "loading";
    });

    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.users = [...state.users, ...action.payload];
    });
  },
});

export const selectUserById =
  (userId: string) =>
  (state: AppState): User | undefined =>
    state.users.users.find((u) => u.id === userId);

export default usersSlice.reducer;
