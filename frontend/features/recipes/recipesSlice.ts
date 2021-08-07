import { ApiState } from "../requests/requestsSlice";
import { createSlice } from "@reduxjs/toolkit";
import { setRecipeForUserAsync } from "./setRecipeForUserAsync";
import { getRecipesForUser } from "./getRecipesForUser";
import { getAllRecipesAsync } from "./getAllRecipesAsync";
import { getRecipeByIdAsync } from "./getRecipeByIdAsync";
import { AppState } from "@lib/redux/store";

export interface Recipe {
  id: string;
  authorId: string;

  name: string;
  description: string;
  instructions: string;

  published: boolean;
  publishedAt: string;
  updated: string;
}

interface RecipesState extends ApiState {
  recipes: Recipe[];
}

const initialState: RecipesState = {
  state: "not-called",
  status: "idle",
  recipes: [],
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setRecipeForUserAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(setRecipeForUserAsync.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(setRecipeForUserAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "called";
      state.recipes = [
        action.payload,
        ...state.recipes.filter((r) => r.id !== action.payload.id),
      ];
    });

    builder.addCase(getRecipesForUser.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getRecipesForUser.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "called";
      state.recipes = [
        ...action.payload,
        ...state.recipes.filter(
          (r) => !action.payload.find((p) => p.id === r.id)
        ),
      ];
    });

    builder.addCase(getAllRecipesAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getAllRecipesAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "called";
      state.recipes = [...action.payload];
    });

    builder.addCase(getRecipeByIdAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getRecipeByIdAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "called";
      state.recipes = [
        action.payload,
        ...state.recipes.filter((r) => r.id !== action.payload.id),
      ];
    });
  },
});

export const selectRecipeById =
  (recipeId: string) =>
  (state: AppState): [boolean, Recipe | undefined] =>
    [
      state.recipes.status === "loading" &&
        state.recipes.state === "not-called",
      state.recipes.recipes.find((r) => r.id === recipeId),
    ];

export const selectRecipesForUser =
  (userId: string) =>
  (state: AppState): [boolean, Recipe[]] =>
    [
      state.recipes.status === "loading" &&
        state.recipes.state === "not-called",
      state.recipes.recipes.filter((r) => r.authorId === userId),
    ];

export default recipesSlice.reducer;
