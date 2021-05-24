import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import { getUsersAsync } from "../../../lib/features/users/getUsersAsync";
import { selectUserById } from "../../../lib/features/users/usersSlice";

const UsersPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUserById(userId as string));

  useEffect(() => {
    if (userId && typeof userId === "string") {
      dispatch(getUsersAsync([userId]));
    }
  }, [userId]);

  if (!user) {
    return <div>Not found...</div>;
  }

  return (
    <div>
      <h1>User: {user.name}</h1>

      <p>Email: {user.email}</p>
    </div>
  );
};

export default UsersPage;
