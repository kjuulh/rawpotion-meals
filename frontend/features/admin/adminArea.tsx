import Invitations from "../invitations/invitations";
import { Headings } from "@components/common/typography/headings";
import { FC } from "react";

const AdminArea: FC<{ groupId: number }> = (props) => (
  <div className="space-y-8">
    <Headings>Admin area</Headings>
    <Invitations groupId={props.groupId} />
  </div>
);

export default AdminArea;
