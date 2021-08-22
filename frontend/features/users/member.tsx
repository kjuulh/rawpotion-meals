import { useRouter } from "next/router";
import { UserVm } from "@lib/api";
import { FC } from "react";

const Member: FC<{ member: UserVm }> = (props) => {
  const router = useRouter();

  return (
    <button
      className="pl-4 hover:underline cursor-pointer hover:text-yellow-500"
      onClick={() =>
        router.push({
          pathname: "/users/[userId]",
          query: {
            userId: props.member.id,
          },
        })
      }
    >
      {props.member.username}
    </button>
  );
};

export default Member;
