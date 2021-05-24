import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../redux/store";
import firebase from "firebase";
import { mealRatingConverter } from "./mealRatingConverter";
import { MealRating } from "./mealRating";

export const setRatingForMealAsync = createAsyncThunk(
  "mealRatings/setForMeal",
  async (params: { mealId: string; rating: number }, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;

    if (!state?.user?.userId) {
      return thunkAPI.rejectWithValue("User was not logged in");
    }

    const ratingDoc = firebase
      .firestore()
      .collection("meals")
      .doc(params.mealId)
      .collection("ratings")
      .withConverter(mealRatingConverter)
      .doc(state.user.userId);

    const rating: MealRating = {
      id: state.user.userId,
      rating: params.rating,
      userId: state.user.userId,
    };

    await ratingDoc.set(rating);

    return rating;
  }
);
