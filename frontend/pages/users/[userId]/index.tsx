import { useRouter } from "next/router";
import { useGetUserByIdQuery } from "@lib/api";

const UsersPage: any = () => {
  const router = useRouter();
  const { userId } = router.query;

  const {
    data: user,
    isLoading,
    isError,
    isUninitialized,
  } = useGetUserByIdQuery(
    { userId: parseInt(userId as string) },
    { skip: !userId }
  );

  if (isLoading || isUninitialized) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Not found...</div>;
  }

  return (
    <div>
      <h1>User: {user.username}</h1>

      <p>Email: {user.email}</p>
    </div>
  );
};

export default UsersPage;
