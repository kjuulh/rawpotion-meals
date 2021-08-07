import Member from "./member";
import { Card } from "@components/common/card/card";
import { CardTitle } from "@components/common/card/cardTitle";
import { FC } from "react";

interface MembersProps {
  members: string[];
  text: string;
  actions?: () => JSX.Element;
}
export const Members: FC<MembersProps> = (props) => {
  return (
    <Card>
      <CardTitle>{props.text}</CardTitle>

      {props.members.length === 0 ? (
        <div className="pl-4">No members yet</div>
      ) : (
        <ul className="space-y-4">
          {props.members.map((m) => (
            <li key={m}>
              <Member member={m} />
            </li>
          ))}
        </ul>
      )}

      {props.actions && <div>{props.actions()}</div>}
    </Card>
  );
};

export default Members;
