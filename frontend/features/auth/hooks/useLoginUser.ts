import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { useRouter } from "next/router";
import { useAuthenticateUserMutation } from "@lib/api";
import { sendToastAsync } from "@lib/redux/toaster/toasterSlice";
import { resetUser } from "@features/user/userSlice";
import { selectReturnUrl } from "@features/auth/authSlice";

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
  const returnUrl = useAppSelector(selectReturnUrl);

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

    if (returnUrl) {
      router.push(returnUrl);
    }

    router.push("/dashboard");
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
