import React, { FC, FormHTMLAttributes } from "react";

export const AuthForm: FC<FormHTMLAttributes<HTMLFormElement>> = (props) => (
  <form
    {...props}
    className="flex flex-col w-full justify-between py-28 px-10 space-y-20 md:max-w-[calc(70%+1rem)] lg:max-w-[calc(50%+1rem)] mx-auto"
  >
    {props.children}
  </form>
);
