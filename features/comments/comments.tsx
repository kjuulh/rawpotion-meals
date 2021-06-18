import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import React, { useEffect } from "react";
import { getCommentsForMealAsync } from "./getCommentsForMealAsync";
import { selectCommentsForMeal } from "./commentsSlice";
import { AddComment } from "./addComment";
import { CommentItem } from "./commentItem";
import { Card } from "@components/common/card/card";
import { CardTitle } from "@components/common/card/cardTitle";

export const Comments = (props: { mealId: string }) => {
  const dispatch = useAppDispatch();
  const [loading, comments] = useAppSelector(
    selectCommentsForMeal(props.mealId)
  );
  useEffect(() => {
    dispatch(getCommentsForMealAsync(props.mealId));
  }, [props.mealId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardTitle>Comments</CardTitle>
      <ul className="space-y-6">
        {comments.length === 0 ? (
          <li>
            <p>No comments yet...</p>
          </li>
        ) : (
          comments.map((c) => (
            <React.Fragment key={c.id}>
              <li>
                <CommentItem comment={c} />
              </li>
            </React.Fragment>
          ))
        )}
      </ul>

      <div>
        <AddComment mealId={props.mealId} />
      </div>
    </Card>
  );
};

export default Comments;
