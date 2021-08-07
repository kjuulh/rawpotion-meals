import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { mealConverter } from "./mealConverter";
import { getUsersAsync } from "../users/getUsersAsync";

export const getMealsByGroupIdAsync = createAsyncThunk(
  "meals/getByGroupId",
  async (
    { groupId, upcoming }: { groupId: string; upcoming?: boolean },
    thunkAPI
  ) => {
    const mealRef = firebase
      .firestore()
      .collection("meals")
      .where("groupId", "==", groupId);
    const now = new Date();
    const timestamp = firebase.firestore.Timestamp.fromDate(
      new Date(now.setHours(0, 0, 0, 0))
    );

    const mealDoc = await (upcoming
      ? mealRef
          .where("date", ">=", timestamp)
          .withConverter(mealConverter)
          .get()
      : mealRef.withConverter(mealConverter).get());

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
