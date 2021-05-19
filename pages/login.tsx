import React, { useEffect } from "react";
import { AnyObject, Field, Form } from "react-final-form";
import { loginAsync, selectUser } from "../lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { useRouter } from "next/router";

const required = (value) => (value ? undefined : "Required");

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.userId) {
      router.push("/dashboard");
    }
  }, [user]);

  const onSubmit = (values: Record<string, any>) => {
    dispatch(
      loginAsync({
        email: values["email"],
        password: values["password"],
      })
    );
  };

  const validateForm = (values: Record<string, any>): AnyObject => {
    return;
  };

  return (
    <div>
      <h1>Login Page</h1>

      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="email"
              validate={required}
              render={({ input, meta }) => (
                <div>
                  <label>Email</label>
                  <input type="email" placeholder="Your email" {...input} />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />
            <Field
              name="password"
              validate={required}
              render={({ input, meta }) => (
                <div>
                  <label>password</label>
                  <input
                    type="password"
                    placeholder="Your Password"
                    {...input}
                  />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />

            <button>Create</button>
          </form>
        )}
      />
    </div>
  );
};

export default LoginPage;
