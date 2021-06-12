import { useAppDispatch } from "@lib/redux/hooks";
import { createInvitationAsync } from "./createInvitationAsync";

const CreateInvitation = (props: { groupId: string }) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(createInvitationAsync(props.groupId))}>
        Create invitation
      </button>
    </div>
  );
};

export default CreateInvitation;
