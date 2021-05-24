import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../redux/store";
import { createMealEventForGroup } from "./createMealEventForGroup";
import { getMealsByGroupIdAsync } from "./getMealsByGroupIdAsync";
import { toggleAttendingAsync } from "./toggleAttendingAsync";
import { getMealEventById } from "./getMealEventById";
import { Meal } from "./meal";

export interface MealState {
  state: "not-called" | "called";
  status: "idle" | "loading" | "failed";
  meals: Meal[];
  recent?: Meal;
}

const initialState: MealState = {
  state: "not-called",
  status: "idle",
  meals: [],
  recent: undefined,
};

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    resetCreateMeal: (state) => {
      state.status = "idle";
      state.state = "not-called";
      state.recent = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createMealEventForGroup.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(createMealEventForGroup.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "called";
      state.meals = [...state.meals, action.payload];
      state.recent = action.payload;
    });

    builder.addCase(getMealEventById.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getMealEventById.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "called";
      state.meals = [
        ...state.meals.filter((m) => m.id !== action.payload.id),
        action.payload,
      ];
    });

    builder.addCase(getMealsByGroupIdAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getMealsByGroupIdAsync.fulfilled, (state, action) => {
      const ids = action.payload.map((m) => m.id);
      state.status = "idle";
      state.state = "called";
      state.meals = [
        ...state.meals.filter((m) => !ids.find((i) => i === m.id)),
        ...action.payload,
      ];
    });

    builder.addCase(toggleAttendingAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(toggleAttendingAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "called";
      state.meals = [
        ...state.meals.filter((m) => m.id !== action.payload.id),
        action.payload,
      ];
    });
  },
});

export const { resetCreateMeal } = mealsSlice.actions;

export const selectCreateMealStatus = (
  state: AppState
): [boolean, Meal | undefined] => [
  state.meals.status === "idle" && state.meals.state === "called",
  state.meals.recent,
];

export const selectGetMealById =
  (mealId: string) =>
  (state: AppState): [boolean, Meal | undefined] =>
    [
      state.meals.status === "loading" && state.meals.state !== "called",
      state.meals.meals.find((m) => m.id === mealId),
    ];

export const selectMealsByGroupId =
  (groupId: string) =>
  (state: AppState): Meal[] =>
    state.meals.meals.filter((m) => m.groupId === groupId);

export default mealsSlice.reducer;
