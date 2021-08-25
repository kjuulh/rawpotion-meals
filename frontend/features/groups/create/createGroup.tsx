import { useCreateGroup } from "@features/groups/create/useCreateGroup";
import { DashboardHeading, DashboardSection } from "@features/dashboard";
import {
  Card,
  CardFormInput,
  Heading,
  PrimaryButton,
} from "@components/common";
import BreadCrumbs from "@components/layouts/breadCrumbs";
import { Form } from "react-final-form";
import { VerticalSpacer } from "@components/common/modifiers/verticalSpacer";
import { CardActionArea } from "@components/common/card/cardActionArea";
import React, { FC } from "react";

export const CreateGroup: FC = () => {
  const [createGroup, { isLoading, isSuccess, isError }] = useCreateGroup();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (isSuccess) {
    return <div>Redirecting</div>;
  }

  return (
    <>
      <DashboardHeading>
        <Heading>Create Group</Heading>
        <BreadCrumbs />
      </DashboardHeading>

      <DashboardSection>
        <Card>
          <Form
            onSubmit={createGroup}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <VerticalSpacer amount={4}>
                  <CardFormInput
                    name="groupName"
                    label="Group name"
                    required
                    placeholder="What is the name of your future group?"
                    type="text"
                  />

                  <CardActionArea>
                    <PrimaryButton>Create</PrimaryButton>
                  </CardActionArea>
                </VerticalSpacer>
              </form>
            )}
          />
        </Card>
      </DashboardSection>
    </>
  );
};
