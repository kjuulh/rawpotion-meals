import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { selectUser, signOutAsync } from "@features/user/userSlice";
import { useRouter } from "next/router";
import { useGetGroupsForUserQuery } from "@lib/api/rawpotion-mealplanner-api.generated";
import {
  ButtonGroup,
  Heading,
  OutlinedButton,
  PrimaryLink,
} from "@components/common";
import GroupsList from "@features/groups/groupsList";
import DashboardLayout from "@components/layouts/dashboardLayout";
import BreadCrumbs from "@components/layouts/breadCrumbs";
import { sendToastAsync } from "@lib/redux/toaster/toasterSlice";
import { DashboardHeading, DashboardSection } from "@features/dashboard";
import { OutlinedLink } from "@components/common/links/primaryLink";

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
    <>
      <DashboardHeading>
        <Heading>Dashboard Page</Heading>
        <BreadCrumbs />
      </DashboardHeading>

      <DashboardSection>
        <GroupsList
          groups={data.groups}
          onGroupClick={(groupId) => router.push(`/groups/${groupId}`)}
        />

        <ButtonGroup>
          <OutlinedLink href={"/users/${user.userId}"}>Profile</OutlinedLink>
          <OutlinedButton
            onClick={() => {
              dispatch(signOutAsync());
              router.push("/");
            }}
          >
            Sign out
          </OutlinedButton>
          <PrimaryLink href={"/group/create"}>Create group</PrimaryLink>
        </ButtonGroup>
      </DashboardSection>
    </>
  );
};

DashboardPage.Layout = DashboardLayout;

export default DashboardPage;
