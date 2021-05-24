import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../redux/store";
import firebase from "firebase";
import { recipeConverter } from "./recipeConverter";

export const setRecipeForUserAsync = createAsyncThunk(
  "recipes/setForUser",
  async (
    params: {
      id?: string;
      name: string;
      description: string;
      instructions: string;
      published?: boolean;
    },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as AppState;
    if (!state.user.userId) {
      console.error("user was not logged in");
      return thunkAPI.rejectWithValue("user was not logged in");
    }

    const recipeColRef = firebase
      .firestore()
      .collection("recipes")
      .withConverter(recipeConverter);

    const recipeRef = params.id
      ? recipeColRef.doc(params.id)
      : recipeColRef.doc();

    await firebase.firestore().runTransaction(async (t) => {
      const recipeDoc = await t.get(recipeRef);

      if (recipeDoc.exists) {
        await t.update(recipeRef, {
          ...params,
          id: recipeDoc.id,
          updated: "now",
        });
      } else {
        await t.set(recipeRef, {
          published: false,
          ...params,
          id: recipeDoc.id,
          authorId: state.user.userId,
          updated: "now",
          publishedAt: "now",
        });
      }
    });

    const recipeDoc = await recipeRef.get();

    if (!recipeDoc.exists) {
      return thunkAPI.rejectWithValue("Could not set recipe");
    }

    return recipeDoc.data();
  }
);
