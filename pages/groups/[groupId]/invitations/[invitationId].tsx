import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { selectUser } from "@features/user/userSlice";
import { getInvitationAsync } from "@features/invitations/getInvitationAsync";
import { selectInvitation } from "@features/invitations/invitationsSlice";
import { joinGroupAsync } from "@features/groups/joinGroupAsync";
import { selectGroupById } from "@features/groups/groupsSlice";
import { getGroupByIdAsync } from "@features/groups/getGroupByIdAsync";
import { DashboardTitle } from "@components/common/typography/dashboardTitle";
import { CardTitle } from "@components/common/card/cardTitle";
import { Card } from "@components/common/card/card";
import { OutlinedButton } from "@components/common/buttons/outlinedButton";
import { selectUserById } from "@features/users/usersSlice";
import { getUsersAsync } from "@features/users/getUsersAsync";
import React from "react";
import { PrimaryButton } from "@components/common/buttons/primaryButton";

function InvitationMember(props: { memberId: string }) {
  const member = useAppSelector(selectUserById(props.memberId));
  if (!member) {
    return null;
  }

  return <>{member.name}</>;
}

function renderMembers(members: string[]) {
  if (members.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h5 className="text-lg">Members:</h5>
      <ul className="space-y-4">
        {members.map((m) => (
          <React.Fragment key={m}>
            <li>
              <InvitationMember memberId={m} />
            </li>
            <hr />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

const AcceptInvitationPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { groupId, invitationId } = router.query;

  const { userId, state } = useAppSelector(selectUser);
  const [loading, invitation] = useAppSelector(
    selectInvitation(invitationId as string)
  );
  const groupSelect = useAppSelector(selectGroupById(groupId as string));

  useEffect(() => {
    if (typeof groupId === "string" && typeof invitationId === "string") {
      dispatch(getInvitationAsync(invitationId));
      dispatch(getGroupByIdAsync(groupId));
    }
  }, [invitationId]);

  useEffect(() => {
    if (groupSelect?.members) {
      dispatch(getUsersAsync(groupSelect.members));
    }
  }, [groupSelect?.members]);

  useEffect(() => {
    if (userId) {
      if (groupSelect.members.find((m) => m === userId)) {
        router.push(`/groups/${groupId}`);
      }
    }
  }, [groupId, groupSelect]);

  if (typeof groupId !== "string" || typeof invitationId !== "string") {
    return null;
  }

  if (state === "not-logged-in" || state === "unknown") {
    return (
      <div className="py-8 px-10 space-y-8 md:max-w-[calc(80%+1rem)] lg:max-w-[calc(50%+1rem)] mx-auto">
        <DashboardTitle>Accept invitation page</DashboardTitle>

        <p>
          We need to you to login to your account before you can accept an
          invite
        </p>

        <div className="space-x-4">
          <PrimaryButton
            onClick={() =>
              router.push(`/login`, {
                query: {
                  returnUrl: router.asPath,
                },
              })
            }
          >
            Login
          </PrimaryButton>

          <OutlinedButton
            onClick={() =>
              router.push(`/register`, {
                query: {
                  returnUrl: router.asPath,
                },
              })
            }
          >
            Register
          </OutlinedButton>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!groupSelect) {
    return null;
  }

  return (
    <div className="py-8 px-10 space-y-8 md:max-w-[calc(80%+1rem)] lg:max-w-[calc(50%+1rem)] mx-auto">
      <DashboardTitle>Accept invitation page</DashboardTitle>

      <Card>
        <CardTitle>
          Join {'"'}
          {groupSelect.name}
          {'" '}?
        </CardTitle>

        {renderMembers(groupSelect.members)}
        <OutlinedButton onClick={() => dispatch(joinGroupAsync(invitation))}>
          Accept invitation
        </OutlinedButton>
      </Card>
    </div>
  );
};

export default AcceptInvitationPage;
