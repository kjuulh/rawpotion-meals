import React from "react";
import { Form } from "react-final-form";
import { useRouter } from "next/router";
import { AuthForm } from "@features/auth/authForm";
import { AuthHeading } from "@features/auth/authHeading";
import { AuthFormTitle } from "@features/auth/authFormTitle";
import { AuthFormCancelButton } from "@features/auth/authFormCancelButton";
import { AuthInputGroup } from "@features/auth/authInputGroup";
import AuthFormInput from "@features/auth/authFormInput";
import { AuthFormButtonGroup } from "@features/auth/authFormButtonGroup";
import { AuthFormButton } from "@features/auth/authFormButton";
import { AuthFormLink } from "@features/auth/authFormLink";
import { useRegisterUserAccountMutation } from "@lib/api";
import { sendToastAsync } from "@lib/redux/toaster/toasterSlice";
import { useAppDispatch } from "@lib/redux/hooks";

const RegisterPage: any = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [
    registerUserAccount,
    { isLoading: isUpdating, error, isError, isSuccess },
  ] = useRegisterUserAccountMutation();

  const onSubmit = (values: Record<string, any>) => {
    registerUserAccount({
      registerUserCommand: {
        username: values["name"],
        email: values["email"],
        password: values["password"],
      },
    });
  };

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }

  if (isSuccess) {
    dispatch(
      sendToastAsync({
        message: "Logged in!",
      })
    );
    router.push("/login");
    return <div>Redirecting...</div>;
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <AuthForm onSubmit={handleSubmit}>
          <AuthHeading>
            <AuthFormTitle>Register</AuthFormTitle>
            <AuthFormCancelButton onClick={() => router.push("/")} />
          </AuthHeading>

          <AuthInputGroup>
            <AuthFormInput
              name={"name"}
              text={"Name"}
              type="text"
              placeholder="NAME"
            />
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
            <AuthFormButton loading={isUpdating}>Register</AuthFormButton>
            <AuthFormLink href="/login">Login</AuthFormLink>
          </AuthFormButtonGroup>
        </AuthForm>
      )}
    />
  );
};

export default RegisterPage;
