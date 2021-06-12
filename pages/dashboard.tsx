import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { selectUser, signOutAsync } from "@features/user/userSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GroupsList from "../features/groups/groupsList";
import { getGroupsForMemberAsync } from "@features/groups/getGroupsForMemberAsync";
import DashboardLayout from "@components/layouts/dashboardLayout";
import { PrimaryButton } from "@components/common/buttons/primaryButton";
import { OutlinedButton } from "@components/common/buttons/outlinedButton";
import { DashboardTitle } from "@components/common/typography/dashboardTitle";
import BreadCrumbs from "@components/layouts/breadCrumbs";

const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user?.state === "not-logged-in") {
      router.push("/login");
      return;
    }

    dispatch(getGroupsForMemberAsync(user.userId));
  }, [user]);

  if (!user?.userId) {
    return null;
  }

  return (
    <div className="space-y-4 box-border">
      <DashboardTitle>Dashboard Page</DashboardTitle>
      <BreadCrumbs />

      <div>
        <GroupsList
          onGroupClick={(groupId) => router.push(`/groups/${groupId}`)}
        />
      </div>

      <div className="flex flex-row gap-4">
        <OutlinedButton onClick={() => router.push(`/users/${user.userId}`)}>
          Profile
        </OutlinedButton>
        <OutlinedButton onClick={() => dispatch(signOutAsync())}>
          Sign out
        </OutlinedButton>
        <PrimaryButton onClick={() => router.push("/group/create")}>
          Create group
        </PrimaryButton>
      </div>
    </div>
  );
};

DashboardPage.Layout = DashboardLayout;

export default DashboardPage;
