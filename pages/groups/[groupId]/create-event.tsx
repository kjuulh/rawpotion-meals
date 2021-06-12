import { useRouter } from "next/router";
import { Field, FieldInputProps, Form } from "react-final-form";
import React, { FC, InputHTMLAttributes, useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useDispatchOnMount,
} from "@lib/redux/hooks";
import {
  resetCreateMeal,
  selectCreateMealStatus,
} from "@features/meals/mealsSlice";
import { createMealEventForGroup } from "@features/meals/createMealEventForGroup";
import { DashboardTitle } from "@components/common/typography/dashboardTitle";
import DashboardLayout from "@components/layouts/dashboardLayout";
import { Card } from "@components/common/card/card";
import { OutlinedButton } from "@components/common/buttons/outlinedButton";
import BreadCrumbs from "@components/layouts/breadCrumbs";
import { getGroupByIdAsync } from "@features/groups/getGroupByIdAsync";

const required = (value) => (value ? undefined : "Required");

interface CardFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fullWidth?: boolean;
}
const CardFormInput: FC<CardFormInputProps> = ({ fullWidth, ...props }) => (
  <Field
    name={props.name}
    validate={required}
    render={({ input, meta }) => (
      <div className="space-y-4">
        <label className="text-lg">{props.label}</label>
        <br />
        <input
          className={`py-2 px-4 border-2 focus:border-yellow-300 rounded-md ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-200"
          } ${fullWidth ? "min-w-full" : ""}`}
          {...props}
          {...input}
        />
        <br />
      </div>
    )}
  />
);

const CreateEventPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { groupId } = router.query;

  useDispatchOnMount(resetCreateMeal);

  const [hasBeenCreated, meal] = useAppSelector(selectCreateMealStatus);

  useEffect(() => {
    dispatch(getGroupByIdAsync(groupId as string));
  }, [groupId]);

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
    <div className="space-y-8">
      <DashboardTitle>Create Event</DashboardTitle>
      <BreadCrumbs />

      <Card>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <CardFormInput
                label="Recipe"
                name="recipe"
                required
                placeholder="What to serve?"
                type="text"
                fullWidth
              />

              <CardFormInput label="Date" name="date" required type="date" />

              <div>
                <OutlinedButton className="mt-4" disabled={invalid}>
                  Create
                </OutlinedButton>
              </div>
            </form>
          )}
        />
      </Card>
    </div>
  );
};

CreateEventPage.Layout = DashboardLayout;

export default CreateEventPage;
