import Invitations from "../invitations/invitations";
import { DashboardTitle } from "@components/common/typography/dashboardTitle";
import { FC } from "react";

const AdminArea: FC<{ groupId: number }> = (props) => (
  <div className="space-y-8">
    <DashboardTitle>Admin area</DashboardTitle>
    <Invitations groupId={props.groupId} />
  </div>
);

export default AdminArea;
