import { useAppDispatch } from "@lib/redux/hooks";
import { createRequestForGroupAsync } from "./requestsSlice";
import { Field, Form } from "react-final-form";
import React from "react";
import { OutlinedButton } from "@components/common/buttons/outlinedButton";

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
      render={({ handleSubmit, valid }) => (
        <form onSubmit={handleSubmit} className="space-y-8">
          <Field
            name="recipe"
            validate={required}
            render={({ input, meta }) => (
              <div>
                <label className="hidden">Recipe Request</label>
                <input
                  type="text"
                  className={`px-4 py-2 border-2 w-full rounded-xl ${
                    meta.touched && meta.error
                      ? `border-red-500`
                      : "border-gray-500 focus:border-yellow-500"
                  }`}
                  placeholder="Add a recipe"
                  {...input}
                />
              </div>
            )}
          />
          <OutlinedButton disabled={!valid}>Add</OutlinedButton>
        </form>
      )}
    />
  );
};
