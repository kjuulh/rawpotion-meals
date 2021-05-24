import { Field, Form } from "react-final-form";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setRatingForMealAsync } from "./setRatingForMealAsync";

export const MealRatingForm = (props: {
  mealId: string;
  currentRating: number;
}) => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(props.currentRating);
  console.log(rating);

  useEffect(() => {
    if (rating && props.mealId) {
      dispatch(
        setRatingForMealAsync({
          ...props,
          rating,
        })
      );
    }
  }, [rating, props.mealId]);

  return (
    <Form
      onSubmit={() => {}}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="rating"
            render={({ input, meta }) => (
              <div>
                <label>Rating</label>
                <input
                  {...input}
                  type="number"
                  min={0}
                  max={10}
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  placeholder="Your rating"
                />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
        </form>
      )}
    />
  );
};
