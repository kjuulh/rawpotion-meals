import { ApiState } from "../requests/requestsSlice";
import { createSlice } from "@reduxjs/toolkit";
import { setRatingForMealAsync } from "./setRatingForMealAsync";
import { MealRating } from "./mealRating";
import { AppState } from "@lib/redux/store";
import { getRatingsForMeal } from "./getRatingsForMeal";

interface MealRatingState extends ApiState {
  rating?: MealRating;
  ratings?: number;
}

const initialState: MealRatingState = {
  state: "not-called",
  status: "idle",
  rating: undefined,
};

export const mealRatingsSlice = createSlice({
  name: "mealRatings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setRatingForMealAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(setRatingForMealAsync.fulfilled, (state, action) => {
      state.state = "called";
      state.status = "idle";
      state.rating = action.payload;
    });

    builder.addCase(getRatingsForMeal.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getRatingsForMeal.fulfilled, (state, action) => {
      const [ratings, userRating] = action.payload;
      state.status = "idle";
      state.state = "called";
      state.rating = userRating;
      state.ratings = ratings;
    });
  },
});

export const selectMealRating = ({
  mealRatings,
}: AppState): [boolean, [number, MealRating]] => [
  mealRatings.status === "loading" && mealRatings.state === "not-called",
  [mealRatings.ratings, mealRatings.rating],
];

export default mealRatingsSlice.reducer;
