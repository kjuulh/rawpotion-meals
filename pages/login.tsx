import React, { useEffect, useState } from "react";
import { AnyObject, Form } from "react-final-form";
import { resetUser, selectUser } from "../src/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../src/lib/redux/hooks";
import { useRouter } from "next/router";
import { loginAsync } from "../src/lib/features/user/loginAsync";
import { AuthFormLink } from "../src/lib/features/auth/authFormLink";
import { AuthFormButtonGroup } from "../src/lib/features/auth/authFormButtonGroup";
import { AuthFormButton } from "../src/lib/features/auth/authFormButton";
import { AuthFormTitle } from "../src/lib/features/auth/authFormTitle";
import { AuthFormCancelButton } from "../src/lib/features/auth/authFormCancelButton";
import { AuthFormInput } from "../src/lib/features/auth/authFormInput";
import { AuthInputGroup } from "../src/lib/features/auth/authInputGroup";
import { AuthHeading } from "../src/lib/features/auth/authHeading";
import { AuthForm } from "../src/lib/features/auth/authForm";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { returnUrl } = router.query;
  const user = useAppSelector(selectUser);

  const [submitTriggered, setSubmitTriggered] = useState(false);

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
    dispatch(
      loginAsync({
        email: values["email"],
        password: values["password"],
      })
    );

    setSubmitTriggered(true);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <AuthForm onSubmit={handleSubmit}>
          <AuthHeading>
            <AuthFormTitle>Login</AuthFormTitle>
            <AuthFormCancelButton onClick={() => router.push("/")} />
          </AuthHeading>

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
            <AuthFormButton>Login</AuthFormButton>
            <AuthFormLink href="/register">Register</AuthFormLink>
          </AuthFormButtonGroup>
        </AuthForm>
      )}
    />
  );
};

export default LoginPage;
