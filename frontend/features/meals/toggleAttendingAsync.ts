import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "@lib/redux/store";
import firebase from "firebase";
import { mealConverter } from "./mealConverter";

export const toggleAttendingAsync = createAsyncThunk(
  "meals/toggleAttending",
  async (mealId: string, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;

    const mealRef = firebase
      .firestore()
      .collection("meals")
      .doc(mealId)
      .withConverter(mealConverter);

    await firebase.firestore().runTransaction(async (t) => {
      const mealDoc = await t.get(mealRef);
      if (!mealDoc.exists) {
        return;
      }
      const meal = mealDoc.data();

      const { userId } = state.user;
      const participating = meal.participating.find((p) => p === userId)
        ? [...meal.participating.filter((p) => p !== userId)]
        : [...meal.participating, userId];

      return t.update(mealRef, {
        participating,
      });
    });

    const mealDoc = await mealRef.get();
    return mealDoc.data();
  }
);
