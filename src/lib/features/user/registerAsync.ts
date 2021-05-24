import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { UserState } from "./userSlice";
import { userConverter } from "../users/userConverter";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const registerAsync = createAsyncThunk(
  "user/register",
  async (input: RegisterInput): Promise<UserState> => {
    const userCreationResponse = await firebase
      .auth()
      .createUserWithEmailAndPassword(input.email, input.password);

    const { uid, email } = userCreationResponse.user;

    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .withConverter(userConverter)
      .set({ name: input.name, id: uid, email: email });

    return { userId: uid, email, status: "idle", state: "logged-in" };
  }
);
