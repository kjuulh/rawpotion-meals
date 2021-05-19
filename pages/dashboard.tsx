import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { selectUser, signOutAsync } from "../lib/features/user/userSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.state === "not-logged-in") {
      router.push("/login");
    }
  }, [user]);

  if (!user?.userId) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard Page</h1>

      <p>{user.userId}</p>
      <p>{user.email}</p>

      <button onClick={() => dispatch(signOutAsync())}>Sign out</button>
    </div>
  );
};

export default DashboardPage;
