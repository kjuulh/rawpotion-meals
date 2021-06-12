import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { invitationConverter } from "./invitationsSlice";

export const getInvitationAsync = createAsyncThunk(
  "invitations/get",
  async (invitationId: string, thunkAPI) => {
    const invitationDoc = await firebase
      .firestore()
      .collection("invitations")
      .doc(invitationId)
      .withConverter(invitationConverter)
      .get();

    if (!invitationDoc.exists) {
      return thunkAPI.rejectWithValue("Could not find invitation");
    }

    return invitationDoc.data();
  }
);
