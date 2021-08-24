import { useRouter } from "next/router";
import React, { FC } from "react";
import { useAppSelector } from "@lib/redux/hooks";
import Members from "../../../../features/users/members";
import { PrimaryButton } from "@components/common/buttons/primaryButton";
import DashboardLayout from "@components/layouts/dashboardLayout";
import { Heading } from "@components/common/typography/heading";
import { Card } from "@components/common/card/card";
import { CardTitle } from "@components/common/card/cardTitle";
import BreadCrumbs from "@components/layouts/breadCrumbs";
import {
  MealVm,
  useDontParticipateInMealMutation,
  useGetGroupByIdQuery,
  useGetMealByIdQuery,
  useParticipateInMealMutation,
  UserVm,
} from "@lib/api";
import { selectUser } from "@features/user/userSlice";

export const Participants: FC<{
  participants: UserVm[];
  mealEvent: MealVm;
  userId: number;
}> = (props) => {
  const [participateInMeal] = useParticipateInMealMutation();
  const [dontParticipateInMeal] = useDontParticipateInMealMutation();

  const toggleParticipationStatus = () => {
    if (props.participants.find((p) => p.id === props.userId)) {
      dontParticipateInMeal({
        mealId: props.mealEvent.id,
        userId: props.userId,
      });
    } else {
      participateInMeal({ mealId: props.mealEvent.id, userId: props.userId });
    }
  };

  return (
    <Members
      text="Participating members"
      members={props.participants}
      actions={() => (
        <PrimaryButton onClick={toggleParticipationStatus}>
          {props.mealEvent.participatingMembers.find(
            (p) => p.id === props.userId
          )
            ? "Dont attend"
            : "Attend"}
        </PrimaryButton>
      )}
    />
  );
};

const MealPage: any = () => {
  const router = useRouter();
  const { groupId, mealId } = router.query;
  const user = useAppSelector(selectUser);

  const groupRes = useGetGroupByIdQuery(
    { groupId: parseInt(groupId as string) },
    { skip: !groupId }
  );
  const mealRes = useGetMealByIdQuery(
    { mealId: parseInt(mealId as string) },
    { skip: !mealId }
  );

  if (
    groupRes.isLoading ||
    mealRes.isLoading ||
    groupRes.isUninitialized ||
    mealRes.isUninitialized
  ) {
    return <div>Loading...</div>;
  }

  if (mealRes.isError) {
    return <div>Meal event was not found</div>;
  }

  const { data: meal } = mealRes;

  return (
    <div className="space-y-8">
      <Heading>Meal</Heading>
      <BreadCrumbs />

      <Card>
        <CardTitle>
          Name: <span>{meal.recipe}</span>
        </CardTitle>

        {meal.description && (
          <div>
            <p>
              <span>Description: </span>
              <span>{meal.description}</span>
            </p>
          </div>
        )}

        <p>
          <span className="font-medium uppercase">Date:</span>{" "}
          <span className="text-md">{meal.date}</span>
        </p>
      </Card>

      <Participants
        participants={meal.participatingMembers}
        mealEvent={meal}
        userId={parseInt(user.userId as string)}
      />
    </div>
  );
};

MealPage.Layout = DashboardLayout;

export default MealPage;
