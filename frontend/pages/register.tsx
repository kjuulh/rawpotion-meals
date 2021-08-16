import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { selectUser } from "@features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { useRouter } from "next/router";
import { registerAsync } from "@features/user/registerAsync";
import { AuthForm } from "@features/auth/authForm";
import { AuthHeading } from "@features/auth/authHeading";
import { AuthFormTitle } from "@features/auth/authFormTitle";
import { AuthFormCancelButton } from "@features/auth/authFormCancelButton";
import { AuthInputGroup } from "@features/auth/authInputGroup";
import AuthFormInput from "@features/auth/authFormInput";
import { AuthFormButtonGroup } from "@features/auth/authFormButtonGroup";
import { AuthFormButton } from "@features/auth/authFormButton";
import { AuthFormLink } from "@features/auth/authFormLink";
import { useIfFirebase } from "@lib/firebase";
import { useRegisterUserAccountMutation } from "@lib/api";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [registerUserAccount, { isLoading: isUpdating, error, isError }] =
    useRegisterUserAccountMutation();

  const [submitTriggered, setSubmitTriggered] = useState(false);

  useEffect(() => {
    if (user.userId && submitTriggered) {
      router.push("/dashboard");
    }
  }, [user]);

  const onSubmit = (values: Record<string, any>) => {
    useIfFirebase(
      () => {
        dispatch(
          registerAsync({
            name: values["name"],
            email: values["email"],
            password: values["password"],
          })
        );
      },
      () => {
        registerUserAccount({
          registerUserCommand: {
            username: values["name"],
            email: values["email"],
            password: values["password"],
          },
        });
      }
    );

    setSubmitTriggered(true);
  };

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
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
