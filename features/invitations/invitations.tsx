import CreateInvitation from "./createInvitation";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { Invitation, selectInvitationForGroup } from "./invitationsSlice";
import { useEffect } from "react";
import { getInvitationsForGroupAsync } from "./getInvitationsForGroupAsync";

function InvitationItem(props: { invitation: Invitation }) {
  return <div>{props.invitation.id}</div>;
}

const Invitations = (props: { groupId: string }) => {
  const dispatch = useAppDispatch();

  const [loading, invitations] = useAppSelector(
    selectInvitationForGroup(props.groupId)
  );

  useEffect(() => {
    dispatch(getInvitationsForGroupAsync(props.groupId));
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ul>
            {invitations.length === 0 ? (
              <li>No invitations yet.</li>
            ) : (
              invitations.map((i) => (
                <li key={i.id}>
                  <InvitationItem invitation={i} />
                </li>
              ))
            )}
          </ul>
        </div>
      )}
      <CreateInvitation groupId={props.groupId} />
    </div>
  );
};

export default Invitations;
