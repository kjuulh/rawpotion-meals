import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { useRouter } from "next/router";
import { resetUser } from "@features/user/userSlice";
import React from "react";
import { Form } from "react-final-form";
import { AuthForm } from "@features/auth/authForm";
import { AuthHeading } from "@features/auth/authHeading";
import { AuthFormTitle } from "@features/auth/authFormTitle";
import { AuthFormCancelButton } from "@features/auth/authFormCancelButton";
import { AuthInputGroup } from "@features/auth/authInputGroup";
import { AuthFormButtonGroup } from "@features/auth/authFormButtonGroup";
import { AuthFormButton } from "@features/auth/authFormButton";
import { AuthFormLink } from "@features/auth/authFormLink";
import AuthFormInput from "@features/auth/authFormInput";
import { useAuthenticateUserMutation } from "@lib/api";
import { selectReturnUrl } from "@features/auth/authSlice";
import { sendToastAsync } from "@lib/redux/toaster/toasterSlice";

export const LoginForm: any = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const returnUrl = useAppSelector(selectReturnUrl);

  const [authenticateUser, { isLoading: isUpdating, isError, isSuccess }] =
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
      return <div>Redirecting...</div>;
    }

    router.push("/dashboard");
    return <div>Redirecting...</div>;
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, valid }) => (
        <AuthForm onSubmit={handleSubmit}>
          <AuthHeading>
            <AuthFormTitle>Login</AuthFormTitle>
            <AuthFormCancelButton onClick={() => router.push("/")} />
          </AuthHeading>

          <div>
            {isError && <>Your credentials were incorrect please try again</>}
          </div>

          <AuthInputGroup>
            <AuthFormInput
              name={"email"}
              text={"Email"}
              type="email"
              placeholder="EMAIL"
            />
            <AuthFormInput
              name="password"
              text="Password"
              type="password"
              placeholder="PASSWORD"
            />
          </AuthInputGroup>

          <AuthFormButtonGroup>
            <AuthFormButton loading={isUpdating} disabled={!valid}>
              Login
            </AuthFormButton>
            <AuthFormLink href="/register">Register</AuthFormLink>
          </AuthFormButtonGroup>
        </AuthForm>
      )}
    />
  );
};

export default LoginForm;
