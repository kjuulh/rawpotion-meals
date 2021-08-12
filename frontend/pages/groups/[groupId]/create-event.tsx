import { useRouter } from "next/router";
import { Form } from "react-final-form";
import React from "react";
import {
  Card,
  CardFormInput,
  DashboardTitle,
  OutlinedButton,
} from "@components/common";
import DashboardLayout from "@components/layouts/dashboardLayout";
import BreadCrumbs from "@components/layouts/breadCrumbs";
import { useCreateMealMutation } from "@lib/api";

const CreateEventPage = () => {
  const router = useRouter();
  const { groupId } = router.query;

  const [createMeal, { data, isLoading, isSuccess, isError }] =
    useCreateMealMutation();

  const onSubmit = (values: Record<string, any>) => {
    if (typeof groupId !== "string") {
      return;
    }

    createMeal({
      createMealRequest: {
        groupId: parseInt(groupId as string),
        date: values["date"],
        recipe: values["recipe"],
      },
    });
  };

  if (isLoading) {
    return <div>Creating...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (isSuccess) {
    router.push(`/groups/${groupId}/meals/${data.id}`);
    return <div>Redirecting...</div>;
  }

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
