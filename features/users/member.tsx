import { useAppSelector } from "@lib/redux/hooks";
import { selectUserById } from "./usersSlice";
import { useRouter } from "next/router";

const Member = (props: { member: string }) => {
  const user = useAppSelector(selectUserById(props.member));
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <button
      className="pl-4 hover:underline cursor-pointer hover:text-yellow-500"
      onClick={() =>
        router.push({
          pathname: "/users/[userId]",
          query: {
            userId: props.member,
          },
        })
      }
    >
      {user.email}
    </button>
  );
};

export default Member;
