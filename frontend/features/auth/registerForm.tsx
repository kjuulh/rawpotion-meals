import React, { FC } from "react";
import { useRouter } from "next/router";
import { Form } from "react-final-form";
import {
  AuthForm,
  AuthFormButton,
  AuthFormButtonGroup,
  AuthFormCancelButton,
  AuthFormInput,
  AuthFormLink,
  AuthFormTitle,
  AuthHeading,
  AuthInputGroup,
} from "@features/auth/components";
import { VisualAlert } from "@components/common/alerts/visualAlert";
import { useRegisterUser } from "@features/auth/hooks/useRegisterUser";

export const RegisterForm: FC = () => {
  const router = useRouter();
  const [registerUser, { isLoading, isSuccess, isError }] = useRegisterUser();

  if (isSuccess) {
    return <div>Redirecting...</div>;
  }

  return (
    <Form
      onSubmit={registerUser}
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

          <VisualAlert active={isError} type="error">
            Something went wrong, please try again with other values or contact
            the server admin
          </VisualAlert>

          <AuthFormButtonGroup>
            <AuthFormButton loading={isLoading}>Register</AuthFormButton>
            <AuthFormLink href="/login">Login</AuthFormLink>
          </AuthFormButtonGroup>
        </AuthForm>
      )}
    />
  );
};
