import CreateInvitation from "./createInvitation";
import React from "react";
import { Card } from "@components/common/card/card";
import { OutlinedButton } from "@components/common/buttons/outlinedButton";
import { useGetInvitationsForGroupQuery } from "@lib/api";
import { InvitationVm } from "@lib/api/rawpotion-mealplanner-api.generated";

const calculateInvitationUrl = (invitation: InvitationVm) =>
  `${window.location.origin}/groups/${invitation.group.id}/invitations/${invitation.id}`;

function InvitationItem(props: { invitation: InvitationVm }) {
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

const Invitations = (props: { groupId: number }) => {
  const { data, isLoading, isUninitialized, isError } =
    useGetInvitationsForGroupQuery({ groupId: props.groupId });

  if (isLoading || isUninitialized) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const { invitations } = data;

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
