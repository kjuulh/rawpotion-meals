import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { groupConverter } from "./groupConverter";
import { Group } from "./group";

export const getGroupsForMemberAsync = createAsyncThunk(
  "groups/getForMember",
  async (userId: string) => {
    let querySnapshot = await firebase
      .firestore()
      .collection("groups")
      .withConverter(groupConverter)
      .where("members", "array-contains", userId)
      .get();

    return querySnapshot.docs.map(
      (qs) =>
        ({
          ...qs.data(),
          id: qs.id,
        } as Group)
    );
  }
);
