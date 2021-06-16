import React, { FC, useState } from "react";
import classNames from "classnames";

interface AuthFormButtonProps {
  disabled?: boolean;
}
export const AuthFormButton: FC<AuthFormButtonProps> = (props) => {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      className={classNames(
        "w-full py-4 bg-yellow-500 text-white rounded-full uppercase text-xl font-bold outline-none focus:outline-none active:outline-none highlight-none hover:bg-yellow-700 focus:bg-yellow-700",
        { "animate-pulse": pressed }
      )}
      disabled={props.disabled}
      onClick={() => setPressed(true)}
    >
      {props.children}
    </button>
  );
};
