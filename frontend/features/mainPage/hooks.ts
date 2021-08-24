import { useRouter } from "next/router";
import { useAppSelector } from "@lib/redux/hooks";
import { selectUser } from "@features/user/userSlice";
import { useEffect } from "react";

export const useIfUserLoggedInRedirectTo: (destination: string) => void = (
  destination: string
) => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.state === "logged-in") {
      router.push(destination);
    }
  }, [user, router, destination]);
};
