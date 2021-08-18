import { useRouter } from "next/router";
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { DashboardTitle } from "@components/common/typography/dashboardTitle";
import { CardTitle } from "@components/common/card/cardTitle";
import { Card } from "@components/common/card/card";
import { OutlinedButton } from "@components/common/buttons/outlinedButton";
import { PrimaryButton } from "@components/common/buttons/primaryButton";
import {
  useGetInvitationForGroupQuery,
  useJoinGroupUsingInvitationMutation,
} from "@lib/api";
import { selectUser } from "@features/user/userSlice";
import { setReturnUrl } from "@features/auth/authSlice";

const AcceptInvitationPage: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { groupId, invitationId } = router.query;
  const user = useAppSelector(selectUser);

  const {
    data: invitation,
    isUninitialized,
    isError,
    isLoading,
  } = useGetInvitationForGroupQuery(
    {
      invitationId: parseInt(invitationId as string),
      groupId: parseInt(groupId as string),
    },
    { skip: !groupId || !invitationId }
  );

  const [joinGroup, joinGroupUtils] = useJoinGroupUsingInvitationMutation();

  if (joinGroupUtils.isSuccess && joinGroupUtils.data) {
    router.push(`/groups/${groupId}`);
  } else if (joinGroupUtils.isError && joinGroupUtils.error) {
    router.push(`/groups/${groupId}`);
  }

  if (isLoading || isUninitialized) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (user.state === "not-logged-in") {
    return (
      <div className="py-8 px-10 space-y-8 md:max-w-[calc(80%+1rem)] lg:max-w-[calc(50%+1rem)] mx-auto">
        <DashboardTitle>Accept invitation</DashboardTitle>

        <p>
          We need to you to login to your account before you can accept an
          invite
        </p>

        <div className="space-x-4">
          <PrimaryButton
            onClick={() => {
              dispatch(setReturnUrl(router.asPath));
              router.push(`/login`);
            }}
          >
            Login
          </PrimaryButton>

          <OutlinedButton
            onClick={() => {
              dispatch(setReturnUrl(router.asPath));
              router.push(`/register`);
            }}
          >
            Register
          </OutlinedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-10 space-y-8 md:max-w-[calc(80%+1rem)] lg:max-w-[calc(50%+1rem)] mx-auto">
      <DashboardTitle>Accept invitation page</DashboardTitle>

      <Card>
        <CardTitle>
          Join {'"'}
          {invitation.group.name}
          {'" '}?
        </CardTitle>

        <OutlinedButton
          onClick={() =>
            joinGroup({
              groupId: parseInt(groupId as string),
              invitationId: parseInt(invitationId as string),
            })
          }
        >
          Accept invitation
        </OutlinedButton>
      </Card>
    </div>
  );
};

export default AcceptInvitationPage;
