import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../redux/store";
import firebase from "firebase";
import { mealConverter } from "../meals/mealConverter";
import { mealRatingConverter } from "./mealRatingConverter";
import { MealRating } from "./mealRating";

export const getRatingsForMeal = createAsyncThunk(
  "mealRatings/getForMeal",
  async (mealId: string, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;
    if (!state?.user?.userId) {
      return thunkAPI.rejectWithValue("User was not logged in");
    }

    const mealRef = firebase
      .firestore()
      .collection("meals")
      .doc(mealId)
      .withConverter(mealConverter);

    const mealDoc = await mealRef.get();
    const ratingDoc = await mealRef
      .collection("ratings")
      .withConverter(mealRatingConverter)
      .where("userId", "==", state.user.userId)
      .get();

    return [mealDoc.data().rating, ratingDoc.docs[0]?.data()] as [
      number | undefined,
      MealRating | undefined
    ];
  }
);
