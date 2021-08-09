import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { UserState } from "./userSlice";
import { AppDispatch } from "@lib/redux/store";

export interface LoginInput {
  email: string;
  password: string;
}

export const loginAsync = createAsyncThunk<
  UserState,
  LoginInput,
  { dispatch: AppDispatch }
>("user/login", async (input) => {
  await firebase.auth().setPersistence("local");

  const userCredential = await firebase
    .auth()
    .signInWithEmailAndPassword(input.email, input.password);

  const { uid, email } = userCredential.user;
  return { userId: uid, email, status: "idle", state: "logged-in" };
});
