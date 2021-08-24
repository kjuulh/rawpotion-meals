import { useAppDispatch } from "@lib/redux/hooks";
import { useRouter } from "next/router";
import { useRegisterUserAccountMutation } from "@lib/api";
import { sendToastAsync } from "@lib/redux/toaster/toasterSlice";

type UseRegisterUserType = () => [
  (values: Record<string, any>) => void,
  {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }
];

export const useRegisterUser: UseRegisterUserType = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [registerUserAccount, { isLoading, isError, isSuccess }] =
    useRegisterUserAccountMutation();

  const onSubmit = (values: Record<string, any>) => {
    registerUserAccount({
      registerUserCommand: {
        username: values["name"],
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
