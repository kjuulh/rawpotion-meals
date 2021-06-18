import { useAppDispatch } from "@lib/redux/hooks";
import { addCommentForMealAsync } from "./addCommentForMealAsync";
import { Field, Form } from "react-final-form";
import React from "react";
import { PrimaryButton } from "@components/common/buttons/primaryButton";

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
      render={({ handleSubmit, valid }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field
            name="message"
            validate={required}
            render={({ input, meta }) => (
              <div className="space-y-2">
                <label className="hidden">Message</label>
                <textarea
                  {...input}
                  placeholder="Your comment"
                  className="w-full border-2 border-gray-300 focus:border-yellow-500 p-6 rounded-xl resize-none"
                />
                {meta.touched && meta.error && (
                  <span className="block hidden">{meta.error}</span>
                )}
              </div>
            )}
          />
          <PrimaryButton className="disabled:bg-gray-500" disabled={!valid}>
            Add
          </PrimaryButton>
        </form>
      )}
    />
  );
};
