import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { groupConverter } from "./groupConverter";

export const getGroupByIdAsync = createAsyncThunk(
  "groups/getById",
  async (groupId: string, thunkAPI) => {
    const documentSnapshot = await firebase
      .firestore()
      .collection("groups")
      .withConverter(groupConverter)
      .doc(groupId)
      .get();

    if (!documentSnapshot.exists) {
      return thunkAPI.rejectWithValue("group doesn't exists");
    }
    return documentSnapshot.data();
  }
);
