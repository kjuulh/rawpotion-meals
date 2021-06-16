import Invitations from "../invitations/invitations";
import { DashboardTitle } from "@components/common/typography/dashboardTitle";

const AdminArea = (props: { groupId: string }) => (
  <div className="space-y-8">
    <DashboardTitle>Admin area</DashboardTitle>
    <Invitations groupId={props.groupId} />
  </div>
);

export default AdminArea;
