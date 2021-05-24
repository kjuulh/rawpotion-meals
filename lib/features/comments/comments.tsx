import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import React, { useEffect } from "react";
import { getCommentsForMealAsync } from "./getCommentsForMealAsync";
import { selectCommentsForMeal } from "./commentsSlice";
import { AddComment } from "./addComment";
import { CommentItem } from "./commentItem";

export const Comments = (props: { mealId: string }) => {
  const dispatch = useAppDispatch();
  const [loading, comments] = useAppSelector(
    selectCommentsForMeal(props.mealId)
  );
  useEffect(() => {
    dispatch(getCommentsForMealAsync(props.mealId));
  }, [props.mealId]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {comments.length === 0 ? (
            <li>
              <p>No comments yet...</p>
            </li>
          ) : (
            comments.map((c) => (
              <li key={c.id}>
                <CommentItem comment={c} />
              </li>
            ))
          )}
        </ul>
      )}

      <div>
        <AddComment mealId={props.mealId} />
      </div>
    </div>
  );
};

export default Comments;
