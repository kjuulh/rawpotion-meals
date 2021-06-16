import CreateInvitation from "./createInvitation";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { Invitation, selectInvitationForGroup } from "./invitationsSlice";
import { useEffect } from "react";
import { getInvitationsForGroupAsync } from "./getInvitationsForGroupAsync";
import { Card } from "@components/common/card/card";
import { OutlinedButton } from "@components/common/buttons/outlinedButton";
import React from "react";

function calculateInvitationUrl(invitation: Invitation) {
  return `${window.location.hostname}/groups/${invitation.groupId}/invitations/${invitation.id}`;
}

function InvitationItem(props: { invitation: Invitation }) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div>{props.invitation.id}</div>
      <OutlinedButton
        onClick={() => {
          navigator.clipboard.writeText(
            calculateInvitationUrl(props.invitation)
          );
        }}
      >
        Copy
      </OutlinedButton>
    </div>
  );
}

const Invitations = (props: { groupId: string }) => {
  const dispatch = useAppDispatch();

  const [loading, invitations] = useAppSelector(
    selectInvitationForGroup(props.groupId)
  );

  useEffect(() => {
    dispatch(getInvitationsForGroupAsync(props.groupId));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <ul className="space-y-4">
        {invitations.length === 0 ? (
          <li>No invitations yet.</li>
        ) : (
          invitations.map((i) => (
            <React.Fragment key={i.id}>
              <li>
                <InvitationItem invitation={i} />
              </li>
              <hr />
            </React.Fragment>
          ))
        )}
      </ul>
      <CreateInvitation groupId={props.groupId} />
    </Card>
  );
};

export default Invitations;
