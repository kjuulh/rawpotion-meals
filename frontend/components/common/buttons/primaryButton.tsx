import React, { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

export const PrimaryButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => (
  <button
    {...props}
    className={classNames(
      "py-2 px-4 bg-yellow-500 rounded-lg text-white hover:bg-yellow-700 transition ",
      props.className
    )}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
