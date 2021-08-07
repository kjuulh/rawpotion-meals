import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "@lib/redux/store";
import firebase from "firebase";
import { userConverter } from "./userConverter";

export const getUsersAsync = createAsyncThunk(
  "users/getUsers",
  async (state: string[], thunkAPI) => {
    const appState = thunkAPI.getState() as AppState;
    const usersNotAlreadyInState = state.filter(
      (userId) => !appState.users.users.find((u) => u.id === userId)
    );

    if (usersNotAlreadyInState.length === 0) {
      return [];
    }

    const users = await firebase
      .firestore()
      .collection("users")
      .where("id", "in", usersNotAlreadyInState)
      .withConverter(userConverter)
      .get();

    return users.docs.map((d) => d.data());
  }
);
