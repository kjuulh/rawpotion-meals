import Invitations from "../invitations/invitations";

const AdminArea = (props: { groupId: string }) => (
  <div>
    Admin area
    <Invitations groupId={props.groupId} />
  </div>
);

export default AdminArea;
