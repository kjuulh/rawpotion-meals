import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { groupConverter } from "./groupConverter";

export const getGroupByIdAsync = createAsyncThunk(
  "groups/getById",
  async (groupId: string) =>
    await firebase
      .firestore()
      .collection("groups")
      .withConverter(groupConverter)
      .doc(groupId)
      .get()
);
