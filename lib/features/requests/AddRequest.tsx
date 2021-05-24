import { useAppDispatch } from "../../redux/hooks";
import { createRequestForGroupAsync } from "./requestsSlice";
import { Field, Form } from "react-final-form";
import React from "react";

export const AddRequest = (props: { groupId: string }) => {
  const dispatch = useAppDispatch();

  const onSubmit = (values: Record<string, any>) => {
    dispatch(
      createRequestForGroupAsync({
        ...props,
        recipe: values["recipe"],
      })
    );
  };

  const required = (value) => (value ? undefined : "Required");
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="recipe"
            validate={required}
            render={({ input, meta }) => (
              <div>
                <label>Recipe Request</label>
                <input type="text" placeholder="Recipe" {...input} />
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
