import { useAppDispatch } from "@lib/redux/hooks";
import { createInvitationAsync } from "./createInvitationAsync";
import { PrimaryButton } from "@components/common/buttons/primaryButton";

const CreateInvitation = (props: { groupId: string }) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <PrimaryButton
        onClick={() => dispatch(createInvitationAsync(props.groupId))}
      >
        Create invitation
      </PrimaryButton>
    </div>
  );
};

export default CreateInvitation;
