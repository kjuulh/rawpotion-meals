import { useAppDispatch, useAppSelector } from "../src/lib/redux/hooks";
import { selectUser, signOutAsync } from "../src/lib/features/user/userSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GroupsList from "../src/lib/features/groups/groupsList";
import { getGroupsForMemberAsync } from "../src/lib/features/groups/getGroupsForMemberAsync";

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
    <div>
      <h1>Dashboard Page</h1>

      <div>
        <GroupsList
          onGroupClick={(groupId) => router.push(`/groups/${groupId}`)}
        />
      </div>

      <button onClick={() => router.push(`/users/${user.userId}`)}>
        Profile
      </button>
      <button onClick={() => dispatch(signOutAsync())}>Sign out</button>
      <button onClick={() => router.push("/group/create")}>Create group</button>
    </div>
  );
};

export default DashboardPage;
