import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Members } from "@features/users/members";
import { Meals } from "@features/meals/meals";
import { useAppSelector } from "@lib/redux/hooks";
import { selectUser } from "@features/user/userSlice";
import DashboardLayout from "@components/layouts/dashboardLayout";
import { DashboardTitle } from "@components/common/typography/dashboardTitle";
import { PrimaryButton } from "@components/common/buttons/primaryButton";
import BreadCrumbs from "@components/layouts/breadCrumbs";
import { getGroupByIdAsync } from "@features/groups/getGroupByIdAsync";
import { GroupDto, useGetGroupByIdQuery } from "@lib/api";

function GoToAdmin(props: {
  userId: number;
  group: GroupDto;
  onClick: () => Promise<boolean>;
}) {
  return (
    <>
      {props.userId === props.group.admin.id && (
        <PrimaryButton onClick={props.onClick}>Go to admin</PrimaryButton>
      )}
    </>
  );
}

const GroupPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { groupId } = router.query;
  //const [loading, group] = useSelector(selectGroup);
  const user = useAppSelector(selectUser);
  const { data, isLoading, isSuccess, isError } = useGetGroupByIdQuery({
    groupId: parseInt(groupId as string),
  });

  useEffect(() => {
    if (groupId && typeof groupId === "string") {
      dispatch(getGroupByIdAsync(groupId));
      //  dispatch(getCurrentGroupByIdAsync(groupId));
      //  dispatch(getMealsByGroupIdAsync({ groupId, upcoming: true }));
    }
  }, [groupId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Not found group...</div>;
  }

  return (
    <div className="space-y-8">
      <DashboardTitle>{data.name}</DashboardTitle>
      <BreadCrumbs />
      <div className="md:grid md:grid-cols-2 md:gap-10">
        <Meals groupId={data.id} limit={5} order={"newest"} hide={"old"} />
        <Members text="Members" members={data.members} />
      </div>
      <GoToAdmin
        userId={user.userId as number}
        group={data}
        onClick={() => router.push(`/groups/${data.id}/admin`)}
      />
      {/*<Requests groupId={parseInt(groupId as string)} />*/}
    </div>
  );
};

GroupPage.Layout = DashboardLayout;

export default GroupPage;
