import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { recipeConverter } from "./recipeConverter";

export const getAllRecipesAsync = createAsyncThunk(
  "recipes/getAll",
  async (_, thunkApi) => {
    const recipesDoc = await firebase
      .firestore()
      .collection("recipes")
      .withConverter(recipeConverter)
      .get();

    return recipesDoc.docs.map((d) => d.data());
  }
);
