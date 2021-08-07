import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { commentConverter } from "./commentConverter";

export const getCommentsForMealAsync = createAsyncThunk(
  "comments/getForMeal",
  async (mealId: string, thunkAPI) => {
    const commentsDoc = await firebase
      .firestore()
      .collection("meals")
      .doc(mealId)
      .collection("comments")
      .withConverter(commentConverter)
      .get();

    return commentsDoc.docs.map((d) => d.data());
  }
);
