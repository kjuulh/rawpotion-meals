import { useRouter } from "next/router";
import { Form } from "react-final-form";
import React from "react";
import {
  Card,
  CardFormInput,
  Heading,
  OutlinedButton,
} from "@components/common";
import DashboardLayout from "@components/layouts/dashboardLayout";
import BreadCrumbs from "@components/layouts/breadCrumbs";
import { useCreateMealMutation } from "@lib/api";
import { sendToastAsync } from "@lib/redux/toaster/toasterSlice";
import { useAppDispatch } from "@lib/redux/hooks";

const CreateEventPage: any = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { groupId } = router.query;

  const [createMeal, { data, isLoading, isSuccess, isError }] =
    useCreateMealMutation();

  const onSubmit = (values: Record<string, any>) => {
    if (typeof groupId !== "string") {
      return;
    }

    createMeal({
      createMealForGroupCommand: {
        groupId: parseInt(groupId as string),
        date: values["date"],
        recipe: values["recipe"],
        description: values["description"],
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
    dispatch(sendToastAsync({ message: "Created event", type: "success" }));
    router.push(`/groups/${groupId}/meals/${data.id}`);
    return <div>Redirecting...</div>;
  }

  return (
    <div className="space-y-8">
      <Heading>Create Event</Heading>
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

              <CardFormInput
                label="Description"
                name="description"
                placeholder="Please provide some details"
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
