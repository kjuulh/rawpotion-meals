import { Comment } from "./commentsSlice";
import React from "react";
import Member from "../users/member";

export const CommentItem = (props: { comment: Comment }) => {
  return (
    <div>
      {props.comment.persisted === false && <div>Persisted</div>}

      <div>{props.comment.text}</div>

      <div>
        <span>
          <Member member={props.comment.authorId} />
        </span>
        <span>{props.comment.date}</span>
      </div>
    </div>
  );
};
