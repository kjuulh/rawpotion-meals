import React, { useEffect } from "react";
import { AnyObject, Field, Form } from "react-final-form";
import { registerAsync, selectUser } from "../lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { useRouter } from "next/router";

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

  useEffect(() => {
    if (user.userId) {
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
  };

  const validateForm = (values: Record<string, any>): AnyObject => {
    return;
  };

  return (
    <div>
      <h1>Register Page</h1>

      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="name"
              validate={required}
              render={({ input, meta }) => (
                <div>
                  <label>Name</label>
                  <input type="text" placeholder="Your name" {...input} />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />
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

export default RegisterPage;
