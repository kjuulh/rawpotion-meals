import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import {
  Invitation,
  invitationConverter,
  optimisticAddInvitation,
} from "./invitationsSlice";

export const createInvitationAsync = createAsyncThunk(
  "invitations/create",
  async (groupId: string, thunkAPI) => {
    const invitationRef = firebase
      .firestore()
      .collection("invitations")
      .doc()
      .withConverter(invitationConverter);

    const invitation: Invitation = {
      id: invitationRef.id,
      groupId,
    };
    thunkAPI.dispatch(optimisticAddInvitation(invitation));

    await invitationRef.set(invitation);
    const invitationDoc = await invitationRef.get();
    if (!invitationDoc.exists) {
      return thunkAPI.rejectWithValue("Could not create invitation");
    }
    return invitationDoc.data();
  }
);
