import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { mealConverter } from "./mealConverter";
import { getUsersAsync } from "../users/getUsersAsync";

export const getMealEventById = createAsyncThunk(
  "meals/getById",
  async (mealId: string, thunkAPI) => {
    const mealDoc = await firebase
      .firestore()
      .collection("meals")
      .withConverter(mealConverter)
      .doc(mealId)
      .get();

    if (!mealDoc.exists) {
      return thunkAPI.rejectWithValue("Meal event was not found");
    }

    let meal = mealDoc.data();
    thunkAPI.dispatch(getUsersAsync(meal.participating));

    return meal;
  }
);
