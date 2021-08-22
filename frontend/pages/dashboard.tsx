import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { selectUser, signOutAsync } from "@features/user/userSlice";
import { useRouter } from "next/router";
import { useGetGroupsForUserQuery } from "@lib/api/rawpotion-mealplanner-api.generated";
import { Headings, OutlinedButton, PrimaryButton } from "@components/common";
import GroupsList from "@features/groups/groupsList";
import DashboardLayout from "@components/layouts/dashboardLayout";
import BreadCrumbs from "@components/layouts/breadCrumbs";
import { sendToastAsync } from "@lib/redux/toaster/toasterSlice";

const DashboardPage: any = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { data, isLoading, isError, isUninitialized } =
    useGetGroupsForUserQuery(
      { userId: user?.userId as number },
      { skip: !user?.userId }
    );

  if (isLoading || isUninitialized) {
    return <div>Loading...</div>;
  }

  if (isError) {
    dispatch(
      sendToastAsync({
        message: "Could not fetch groups for some reason",
        type: "error",
      })
    );
  }

  return (
    <div className="space-y-4 box-border">
      <Headings>Dashboard Page</Headings>
      <BreadCrumbs />

      <div>
        <GroupsList
          groups={data.groups}
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
            router.push("/");
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
