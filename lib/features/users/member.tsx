import { useAppSelector } from "../../redux/hooks";
import { selectUserById } from "./usersSlice";
import { useEffect } from "react";

const Member = (props: { member: string }) => {
  const user = useAppSelector(selectUserById(props.member));

  if (!user) {
    return null;
  }

  return <div>{user.email}</div>;
};

export default Member;
