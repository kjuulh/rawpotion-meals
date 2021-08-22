import { ButtonHTMLAttributes, FC } from "react";

export const OutlinedButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => (
  <button
    className={`py-2 px-4 bg-white border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-100 hover:border-yellow-700 active:bg-yellow-300 hover:border-yellow-500 transition-all disabled:border-gray-500 ${props.className}`}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
