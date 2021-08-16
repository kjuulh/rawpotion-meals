import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "@lib/redux/store";
import firebase from "firebase";
import { groupConverter } from "./groupConverter";
import { Group } from "./group";

export const createGroupAsync = createAsyncThunk(
  "groups/create",
  async (groupName: string, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;

    if (!state.user.userId) {
      return thunkAPI.rejectWithValue("userId was not found");
    }
    const groupRef = await firebase
      .firestore()
      .collection("groups")
      .withConverter(groupConverter)
      .doc();

    await groupRef.set({
      id: groupRef.id,
      name: groupName,
      members: [state.user.userId as string],
      admin: state.user.userId as string,
    });

    const documentSnapshot = await groupRef.withConverter(groupConverter).get();
    if (documentSnapshot.data) {
      return {
        ...documentSnapshot.data,
        id: documentSnapshot.id,
      } as Group;
    }
  }
);
