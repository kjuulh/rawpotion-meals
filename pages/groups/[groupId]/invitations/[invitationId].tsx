import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { selectUser } from "@features/user/userSlice";
import { getInvitationAsync } from "@features/invitations/getInvitationAsync";
import { selectInvitation } from "@features/invitations/invitationsSlice";
import { joinGroupAsync } from "@features/groups/joinGroupAsync";
import { selectGroupById } from "@features/groups/groupsSlice";
import { getGroupByIdAsync } from "@features/groups/getGroupByIdAsync";

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
      <div>
        <h1>Accept invitation page</h1>

        <p>
          We need to you to login to your account before you can accept an
          invite
        </p>

        <button
          onClick={() =>
            router.push(`/login`, {
              query: {
                returnUrl: router.asPath,
              },
            })
          }
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Accept invitation page</h1>

      <p>InvitationId: {invitationId}</p>

      <button onClick={() => dispatch(joinGroupAsync(invitation))}>
        Accept invitation
      </button>
    </div>
  );
};

export default AcceptInvitationPage;
