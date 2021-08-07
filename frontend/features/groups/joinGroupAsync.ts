import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Invitation,
  invitationConverter,
} from "../invitations/invitationsSlice";
import { AppState } from "@lib/redux/store";
import firebase from "firebase";
import { groupConverter } from "./groupConverter";
import { getGroupByIdAsync } from "@features/groups/getGroupByIdAsync";

export const joinGroupAsync = createAsyncThunk(
  "groups/join",
  async (invitation: Invitation, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;

    if (!state.user.userId) {
      return thunkAPI.rejectWithValue("userId was not found");
    }

    const groupRef = firebase
      .firestore()
      .collection("groups")
      .doc(invitation.groupId)
      .withConverter(groupConverter);

    const invitationRef = firebase
      .firestore()
      .collection("invitations")
      .doc(invitation.id)
      .withConverter(invitationConverter);

    let groupDoc = await groupRef.get();
    const invitationDoc = await invitationRef.get();

    if (!groupDoc.exists || !invitationDoc.exists) {
      return Promise.reject(
        "input was invalid: either groupDoc or invitationDoc"
      );
    }

    await groupRef.update({
      members: [
        ...groupDoc.data().members.filter((m) => m !== state.user.userId),
        state.user.userId,
      ],
    });

    groupDoc = await groupRef.withConverter(groupConverter).get();
    if (!groupDoc.exists) {
      return thunkAPI.rejectWithValue("could not join group");
    }

    thunkAPI.dispatch(getGroupByIdAsync(groupDoc.id));

    return groupDoc.data();
  }
);
