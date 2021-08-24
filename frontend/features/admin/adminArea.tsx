import Invitations from "../invitations/invitations";
import { Heading } from "@components/common/typography/heading";
import { FC } from "react";

const AdminArea: FC<{ groupId: number }> = (props) => (
  <div className="space-y-8">
    <Heading>Admin area</Heading>
    <Invitations groupId={props.groupId} />
  </div>
);

export default AdminArea;
