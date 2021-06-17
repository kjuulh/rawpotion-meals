import React, { FC, useState } from "react";
import classNames from "classnames";

interface AuthFormButtonProps {
  disabled?: boolean;
}
export const AuthFormButton: FC<AuthFormButtonProps> = (props) => {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      tabIndex={1}
      type="submit"
      className={classNames(
        "authFormButton max-w-max px-24 py-3 bg-yellow-500 text-white rounded-full uppercase text-lg font-bold outline-none focus:outline-none active:outline-none highlight-none hover:bg-yellow-700 focus:bg-yellow-700",
        { "animate-pulse": pressed }
      )}
      disabled={props.disabled}
      onClick={() => setPressed(true)}
    >
      {props.children}
    </button>
  );
};
