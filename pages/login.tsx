import React, { useEffect, useState } from "react";
import { AnyObject, Field, Form } from "react-final-form";
import { resetUser, selectUser } from "../lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { useRouter } from "next/router";
import { loginAsync } from "../lib/features/user/loginAsync";

const required = (value) => (value ? undefined : "Required");

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

            <button>Login</button>
          </form>
        )}
      />
    </div>
  );
};

export default LoginPage;
