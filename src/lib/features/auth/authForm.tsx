import React, { FC, FormHTMLAttributes } from "react";

export const AuthForm: FC<FormHTMLAttributes<HTMLFormElement>> = (props) => (
  <form
    {...props}
    className="flex flex-col w-full justify-between py-28 px-10 space-y-20"
  >
    {props.children}
  </form>
);
