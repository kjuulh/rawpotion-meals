import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks";
import { selectGetMealById } from "../../../../lib/features/meals/mealsSlice";
import Members from "../../../../lib/features/users/members";
import { selectUser } from "../../../../lib/features/user/userSlice";
import { Comments } from "../../../../lib/features/comments/comments";
import { MealRating } from "../../../../lib/features/mealRatings/mealRating";
import { toggleAttendingAsync } from "../../../../lib/features/meals/toggleAttendingAsync";
import { getMealEventById } from "../../../../lib/features/meals/getMealEventById";

export const Participants = (props: { participants: string[] }) => (
  <Members members={props.participants} />
);

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
    <div>
      <h1>Meal page</h1>

      <div>
        <p>
          Name: <span>{mealEvent.recipe}</span>
        </p>
        <p>
          Date: <span>{mealEvent.date}</span>
        </p>

        <div>
          <MealRating mealId={mealId as string} />
        </div>

        <div>
          Participants:
          <Participants participants={mealEvent.participating} />
        </div>
      </div>
      <button onClick={() => dispatch(toggleAttendingAsync(mealEvent.id))}>
        {mealEvent.participating.find((p) => p === user.userId)
          ? "Dont attend"
          : "Attend"}
      </button>

      <div>
        <Comments mealId={mealEvent.id} />
      </div>
    </div>
  );
};

export default MealPage;
