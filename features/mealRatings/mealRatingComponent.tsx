import React, { useEffect } from "react";
import { MealRatingForm } from "./mealRatingForm";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { getRatingsForMeal } from "./getRatingsForMeal";
import { selectMealRating } from "./mealRatingsSlice";

export const MealRatingComponent = (props: { mealId: string }) => {
  const dispatch = useAppDispatch();
  const [loading, [ratings, userRating]] = useAppSelector(selectMealRating);

  useEffect(() => {
    if (props.mealId) {
      dispatch(getRatingsForMeal(props.mealId));
    }
  }, [props.mealId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2>
        Rating: <span>{ratings ? ratings : "no rating yet."}</span>
      </h2>
      <MealRatingForm {...props} currentRating={userRating?.rating} />
    </div>
  );
};
