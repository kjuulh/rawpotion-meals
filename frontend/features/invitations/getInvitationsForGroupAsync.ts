import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { invitationConverter } from "./invitationsSlice";

export const getInvitationsForGroupAsync = createAsyncThunk(
  "invitations/getForGroup",
  async (groupId: string, thunkAPI) => {
    const invitationDoc = await firebase
      .firestore()
      .collection("invitations")
      .where("groupId", "==", groupId)
      .withConverter(invitationConverter)
      .get();

    return invitationDoc.docs.map((d) => d.data());
  }
);
