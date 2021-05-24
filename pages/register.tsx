import React, { useEffect, useState } from "react";
import { AnyObject, Field, Form } from "react-final-form";
import { selectUser } from "../src/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../src/lib/redux/hooks";
import { useRouter } from "next/router";
import { registerAsync } from "../src/lib/features/user/registerAsync";
import { AuthForm } from "../src/lib/features/auth/authForm";
import { AuthHeading } from "../src/lib/features/auth/authHeading";
import { AuthFormTitle } from "../src/lib/features/auth/authFormTitle";
import { AuthFormCancelButton } from "../src/lib/features/auth/authFormCancelButton";
import { AuthInputGroup } from "../src/lib/features/auth/authInputGroup";
import { AuthFormInput } from "../src/lib/features/auth/authFormInput";
import { AuthFormButtonGroup } from "../src/lib/features/auth/authFormButtonGroup";
import { AuthFormButton } from "../src/lib/features/auth/authFormButton";
import { AuthFormLink } from "../src/lib/features/auth/authFormLink";

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

const required = (value) => (value ? undefined : "Required");

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const [submitTriggered, setSubmitTriggered] = useState(false);

  useEffect(() => {
    if (user.userId && submitTriggered) {
      router.push("/dashboard");
    }
  }, [user]);

  const onSubmit = (values: Record<string, any>) => {
    dispatch(
      registerAsync({
        name: values["name"],
        email: values["email"],
        password: values["password"],
      })
    );

    setSubmitTriggered(true);
  };

  const validateForm = (values: Record<string, any>): AnyObject => {
    return;
  };

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
            <AuthFormButton>Register</AuthFormButton>
            <AuthFormLink href="/login">Login</AuthFormLink>
          </AuthFormButtonGroup>
        </AuthForm>
      )}
    />
  );
};

export default RegisterPage;
