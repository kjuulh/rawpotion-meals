import { PrimaryButton } from "@components/common/buttons/primaryButton";
import { useCreateInvitationForGroupMutation } from "@lib/api";

const CreateInvitation = (props: { groupId: number }) => {
  const [createInvitation] = useCreateInvitationForGroupMutation();

  return (
    <div>
      <PrimaryButton
        onClick={() => {
          createInvitation({ groupId: props.groupId });
        }}
      >
        Create invitation
      </PrimaryButton>
    </div>
  );
};

export default CreateInvitation;
