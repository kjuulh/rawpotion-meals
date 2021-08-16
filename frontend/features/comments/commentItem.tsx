import { Comment } from "./commentsSlice";
import React from "react";
import Member from "../users/member";
import { Card } from "@components/common/card/card";
import { CardTitle } from "@components/common/card/cardTitle";
import { UserDto } from "@lib/api";

export const CommentItem = (props: { comment: Comment }) => {
  return (
    <Card>
      {props.comment.persisted === false && <div>Persisted</div>}

      <div className="flex flex-row justify-between">
        <CardTitle>
          <Member member={props.comment.authorId as unknown as UserDto} />
        </CardTitle>
        <span className="text-gray-700 text-sm">{props.comment.date}</span>
      </div>

      <div>
        <p className="block w-full border-2 py-2 px-5 rounded-lg">
          {props.comment.text}
        </p>
      </div>
    </Card>
  );
};
