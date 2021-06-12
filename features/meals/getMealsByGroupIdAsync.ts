import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { mealConverter } from "./mealConverter";
import { getUsersAsync } from "../users/getUsersAsync";

export const getMealsByGroupIdAsync = createAsyncThunk(
  "meals/getByGroupId",
  async (groupId: string, thunkAPI) => {
    const mealDoc = await firebase
      .firestore()
      .collection("meals")
      .where("groupId", "==", groupId)
      .withConverter(mealConverter)
      .get();

    const meals = mealDoc.docs.map((d) => d.data());
    const allParticipants = meals.map((m) => m.participating).flatMap((m) => m);
    const allParticipantsWithoutDuplicates = allParticipants.filter(
      (p, i) => !allParticipants.includes(p, i + 1)
    );

    if (allParticipantsWithoutDuplicates) {
      thunkAPI.dispatch(getUsersAsync(allParticipantsWithoutDuplicates));
    }

    return meals;
  }
);
