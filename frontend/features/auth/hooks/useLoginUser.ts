import { useAppDispatch } from "@lib/redux/hooks";
import { useRouter } from "next/router";
import { useAuthenticateUserMutation } from "@lib/api";
import { sendToastAsync } from "@lib/redux/toaster/toasterSlice";
import { resetUser } from "@features/user/userSlice";

type UseLoginUserType = () => [
  (values: Record<string, any>) => void,
  {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }
];

export const useLoginUser: UseLoginUserType = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [authenticateUser, { isLoading, isError, isSuccess }] =
    useAuthenticateUserMutation();

  const onSubmit = (values: Record<string, any>) => {
    dispatch(resetUser);

    authenticateUser({
      authenticateUserRequest: {
        email: values["email"],
        password: values["password"],
      },
    });
  };

  if (isSuccess) {
    dispatch(
      sendToastAsync({
        message: "Logged in!",
      })
    );
    router.push("/login");
  }

  return [
    onSubmit,
    {
      isLoading,
      isError,
      isSuccess,
    },
  ];
};
