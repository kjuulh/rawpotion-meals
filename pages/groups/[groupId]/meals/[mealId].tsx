import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { selectGetMealById } from "@features/meals/mealsSlice";
import Members from "../../../../features/users/members";
import { selectUser } from "@features/user/userSlice";
import { Comments } from "@features/comments/comments";
import { toggleAttendingAsync } from "@features/meals/toggleAttendingAsync";
import { getMealEventById } from "@features/meals/getMealEventById";
import { MealRatingComponent } from "@features/mealRatings/mealRatingComponent";
import { Meal } from "@features/meals/meal";
import { PrimaryButton } from "@components/common/buttons/primaryButton";
import DashboardLayout from "@components/layouts/dashboardLayout";
import { DashboardTitle } from "@components/common/typography/dashboardTitle";
import { Card } from "@components/common/card/card";
import { CardTitle } from "@components/common/card/cardTitle";

export const Participants = (props: {
  participants: string[];
  mealEvent: Meal;
  userId: string;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Members
      text="Participating members"
      members={props.participants}
      actions={() => (
        <PrimaryButton
          onClick={() => dispatch(toggleAttendingAsync(props.mealEvent.id))}
        >
          {props.mealEvent.participating.find((p) => p === props.userId)
            ? "Dont attend"
            : "Attend"}
        </PrimaryButton>
      )}
    />
  );
};

const MealPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { groupId, mealId } = router.query;

  const [loading, mealEvent] = useAppSelector(
    selectGetMealById(mealId as string)
  );
  useEffect(() => {
    if (typeof groupId === "string" && typeof mealId === "string") {
      dispatch(getMealEventById(mealId));
    }
  }, [groupId, mealId]);

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  if (!mealEvent) {
    return <div>Meal event was not found</div>;
  }

  return (
    <div className="space-y-8">
      <DashboardTitle>Meal</DashboardTitle>

      <Card>
        <CardTitle>
          Name: <span>{mealEvent.recipe}</span>
        </CardTitle>
        <p>
          <span className="font-medium uppercase">Date:</span>{" "}
          <span className="text-md">{mealEvent.date}</span>
        </p>

        <MealRatingComponent mealId={mealId as string} />
      </Card>

      <Participants
        participants={mealEvent.participating}
        mealEvent={mealEvent}
        userId={user.userId}
      />

      <Comments mealId={mealEvent.id} />
    </div>
  );
};

MealPage.Layout = DashboardLayout;

export default MealPage;
