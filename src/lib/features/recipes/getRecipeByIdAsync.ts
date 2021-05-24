import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { recipeConverter } from "./recipeConverter";

export const getRecipeByIdAsync = createAsyncThunk(
  "recipes/get",
  async (recipeId: string, thunkAPI) => {
    const recipeDoc = await firebase
      .firestore()
      .collection("recipes")
      .doc(recipeId)
      .withConverter(recipeConverter)
      .get();

    if (!recipeDoc.exists) {
      return thunkAPI.rejectWithValue("Could not find recipe");
    }

    return recipeDoc.data();
  }
);
