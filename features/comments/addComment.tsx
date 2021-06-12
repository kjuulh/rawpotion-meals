import { useAppDispatch } from "@lib/redux/hooks";
import { addCommentForMealAsync } from "./addCommentForMealAsync";
import { Field, Form } from "react-final-form";
import React from "react";

const required = (value) => (value ? undefined : "Required");

export const AddComment = (props: { mealId: string }) => {
  const dispatch = useAppDispatch();

  const onSubmit = (values: Record<string, any>) => {
    dispatch(
      addCommentForMealAsync({
        mealId: props.mealId,
        text: values["message"],
      })
    );

    values["message"] = "";
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="message"
            validate={required}
            render={({ input, meta }) => (
              <div>
                <label>Message</label>
                <textarea {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
          <button>Add</button>
        </form>
      )}
    />
  );
};
