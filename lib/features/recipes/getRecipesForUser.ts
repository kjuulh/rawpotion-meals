import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { recipeConverter } from "./recipeConverter";

export const getRecipesForUser = createAsyncThunk(
  "recipes/getForUser",
  async (userId: string, thunkApi) => {
    if (!userId) {
      return thunkApi.rejectWithValue("userId was not valid");
    }
    const recipesDoc = await firebase
      .firestore()
      .collection("recipes")
      .where("authorId", "==", userId)
      .withConverter(recipeConverter)
      .get();

    return recipesDoc.docs.map((d) => d.data());
  }
);
