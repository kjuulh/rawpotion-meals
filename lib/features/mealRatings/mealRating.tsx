import React, { useEffect } from "react";
import { MealRatingForm } from "./mealRatingForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getRatingsForMeal } from "./getRatingsForMeal";
import { selectMealRating } from "./mealRatingsSlice";

export const MealRating = (props: { mealId: string }) => {
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
    <div>
      <h2>
        Rating: <span>{ratings ? ratings : "no rating yet."}</span>
      </h2>
      <div>
        <MealRatingForm {...props} currentRating={userRating?.rating} />
      </div>
    </div>
  );
};
