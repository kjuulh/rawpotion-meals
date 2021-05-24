import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../redux/store";
import firebase from "firebase";
import { mealConverter } from "./mealConverter";

export const createMealEventForGroup = createAsyncThunk(
  "meals/create",
  async (
    params: { date: string; recipe: string; groupId: string },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as AppState;

    const mealsRef = firebase
      .firestore()
      .collection("meals")
      .withConverter(mealConverter)
      .doc();

    await mealsRef.set({
      id: mealsRef.id,
      date: params.date,
      recipe: params.recipe,
      groupId: params.groupId,
      participating: [state.user.userId],
    });

    let meal = await mealsRef.get();
    if (!meal.exists) {
      return thunkAPI.rejectWithValue("meal could not be created");
    }
    return meal.data();
  }
);
