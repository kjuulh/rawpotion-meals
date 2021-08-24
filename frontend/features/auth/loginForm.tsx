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
import { useRouter } from "next/router";
import { VisualAlert } from "@components/common/alerts/visualAlert";
import { useLoginUser } from "@features/auth/hooks";

export const LoginForm: any = () => {
  const router = useRouter();

  const [loginUser, { isLoading, isSuccess, isError }] = useLoginUser();

  if (isSuccess) {
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
