import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getGroupByIdAsync,
  selectGroup,
} from "../../../lib/features/currentGroup/currentGroupSlice";
import { Members } from "../../../lib/features/users/members";
import { Meals } from "../../../lib/features/meals/meals";
import { useAppSelector } from "../../../lib/redux/hooks";
import { selectUser } from "../../../lib/features/user/userSlice";
import Requests from "../../../lib/features/requests/Requests";
import { getMealsByGroupIdAsync } from "../../../lib/features/meals/getMealsByGroupIdAsync";

const GroupPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { groupId } = router.query;
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (groupId && typeof groupId === "string") {
      dispatch(getGroupByIdAsync(groupId));
      dispatch(getMealsByGroupIdAsync(groupId));
    }
  }, [groupId]);

  const [loading, group] = useSelector(selectGroup);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!group) {
    return <div>Not found group!</div>;
  }

  return (
    <div>
      <h1>{group.name}</h1>

      <Meals groupId={group.id} limit={5} order={"newest"} hide={"old"} />

      <Members members={group.members} />
      <button onClick={() => router.push(`/groups/${groupId}/create-event`)}>
        Create meal event
      </button>

      {user && user.userId === group.admin && (
        <button onClick={() => router.push(`/groups/${group.id}/admin`)}>
          Go to admin
        </button>
      )}

      <div>
        <Requests groupId={groupId as string} />
      </div>
    </div>
  );
};

export default GroupPage;
