import { useRouter } from "next/router";
import { Field, Form } from "react-final-form";
import React, { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useDispatchOnMount,
} from "../../../src/lib/redux/hooks";
import {
  resetCreateMeal,
  selectCreateMealStatus,
} from "../../../src/lib/features/meals/mealsSlice";
import { createMealEventForGroup } from "../../../src/lib/features/meals/createMealEventForGroup";

const required = (value) => (value ? undefined : "Required");

const CreateEventPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { groupId } = router.query;

  useDispatchOnMount(resetCreateMeal);

  const [hasBeenCreated, meal] = useAppSelector(selectCreateMealStatus);

  useEffect(() => {
    if (hasBeenCreated && meal) {
      router.push(`/groups/${groupId}/meals/${meal.id}`);
    }
  }, [hasBeenCreated, meal]);

  const onSubmit = (values: Record<string, any>) => {
    if (typeof groupId !== "string") {
      return;
    }

    dispatch(
      createMealEventForGroup({
        groupId,
        date: values["date"],
        recipe: values["recipe"],
      })
    );
  };

  return (
    <div>
      <h1>Create Event</h1>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="recipe"
              validate={required}
              render={({ input, meta }) => (
                <div>
                  <label>Recipe</label>
                  <input type="text" placeholder="What to serve" {...input} />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />
            <Field
              name="date"
              validate={required}
              render={({ input, meta }) => (
                <div>
                  <label>Date</label>
                  <input type="date" {...input} />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />

            <button>Create</button>
          </form>
        )}
      />
    </div>
  );
};

export default CreateEventPage;
