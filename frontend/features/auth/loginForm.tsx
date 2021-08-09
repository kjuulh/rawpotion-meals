import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { useRouter } from "next/router";
import { resetUser, selectUser } from "@features/user/userSlice";
import React, { useEffect, useState } from "react";
import { loginAsync } from "@features/user/loginAsync";
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
import { useIfFirebase } from "@lib/firebase";
import { useAuthenticateUserMutation } from "@lib/api";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { returnUrl } = router.query;
  const user = useAppSelector(selectUser);

  const [submitTriggered, setSubmitTriggered] = useState(false);

  const [
    authenticateUser,
    { isLoading: isUpdating, data, isError, error, isSuccess },
  ] = useAuthenticateUserMutation();

  useEffect(() => {
    if (user?.userId && submitTriggered) {
      if (returnUrl && typeof returnUrl === "string") {
        router.push(returnUrl);
        return;
      }
      router.push("/dashboard");
    }
  }, [user]);

  const onSubmit = (values: Record<string, any>) => {
    dispatch(resetUser);

    useIfFirebase(
      () => {
        dispatch(
          loginAsync({
            email: values["email"],
            password: values["password"],
          })
        );
      },
      () => {
        authenticateUser({
          authenticateUserRequest: {
            email: values["email"],
            password: values["password"],
          },
        });
      }
    );
    setSubmitTriggered(true);
  };

  if (isSuccess) {
    router.push("/dashboard");
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
