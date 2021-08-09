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
import { useIfFirebase } from "@lib/firebase";
import { useGetWeatherForecastQuery } from "@lib/api";

const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { refetch } = useGetWeatherForecastQuery(false, {});

  useEffect(() => {
    if (user?.state === "not-logged-in") {
      router.push("/login");
      return;
    }

    useIfFirebase(
      () => {
        dispatch(getGroupsForMemberAsync(user.userId as string));
      },
      () => {
        refetch();
        //useGetGroupsForUser(user.userId);
      }
    );
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
        <OutlinedButton
          onClick={() => {
            dispatch(signOutAsync());
            window.location.href = "/";
          }}
        >
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
