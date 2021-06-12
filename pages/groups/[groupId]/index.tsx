import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCurrentGroupByIdAsync,
  selectGroup,
} from "@features/currentGroup/currentGroupSlice";
import { Members } from "@features/users/members";
import { Meals } from "@features/meals/meals";
import { useAppSelector } from "@lib/redux/hooks";
import { selectUser } from "@features/user/userSlice";
import Requests from "@features/requests/Requests";
import { getMealsByGroupIdAsync } from "@features/meals/getMealsByGroupIdAsync";
import DashboardLayout from "@components/layouts/dashboardLayout";
import { DashboardTitle } from "@components/common/typography/dashboardTitle";
import { PrimaryButton } from "@components/common/buttons/primaryButton";
import { Group } from "@features/groups/group";
import BreadCrumbs from "@components/layouts/breadCrumbs";
import { getGroupByIdAsync } from "@features/groups/getGroupByIdAsync";

function GoToAdmin(props: {
  userId: string;
  group: Group;
  onClick: () => Promise<boolean>;
}) {
  return (
    <>
      {props.userId === props.group.admin && (
        <PrimaryButton onClick={props.onClick}>Go to admin</PrimaryButton>
      )}
    </>
  );
}

const GroupPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { groupId } = router.query;
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (groupId && typeof groupId === "string") {
      dispatch(getGroupByIdAsync(groupId));
      dispatch(getCurrentGroupByIdAsync(groupId));
      dispatch(getMealsByGroupIdAsync(groupId));
    }
  }, [groupId]);

  const [loading, group] = useSelector(selectGroup);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!group) {
    return <div>Could not find group!</div>;
  }

  return (
    <div className="space-y-8">
      <DashboardTitle>{group.name}</DashboardTitle>
      <BreadCrumbs />
      <Meals groupId={group.id} limit={5} order={"newest"} hide={"old"} />
      <Members text="Members" members={group.members} />
      <GoToAdmin
        userId={user.userId}
        group={group}
        onClick={() => router.push(`/groups/${group.id}/admin`)}
      />
      <Requests groupId={groupId as string} />
    </div>
  );
};

GroupPage.Layout = DashboardLayout;

export default GroupPage;
