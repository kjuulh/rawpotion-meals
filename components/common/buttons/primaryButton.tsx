import { ButtonHTMLAttributes, FC } from "react";

export const PrimaryButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => (
  <button
    className="py-2 px-4 bg-yellow-500 rounded-lg text-white hover:bg-yellow-700"
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
