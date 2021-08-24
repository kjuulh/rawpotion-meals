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
import { sendToastAsync } from "@lib/redux/toaster/toasterSlice";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { useRouter } from "next/router";
import { VisualAlert } from "@components/common/alerts/visualAlert";
import { selectReturnUrl } from "@features/auth/authSlice";
import { useLoginUser } from "@features/auth/hooks";

export const LoginForm: any = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const returnUrl = useAppSelector(selectReturnUrl);

  const [loginUser, { isLoading, isSuccess, isError }] = useLoginUser();

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
      onSubmit={loginUser}
      render={({ handleSubmit, valid }) => (
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

          <VisualAlert active={isError} type="error">
            Your credentials were incorrect please try again
          </VisualAlert>

          <AuthFormButtonGroup>
            <AuthFormButton loading={isLoading} disabled={!valid}>
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
