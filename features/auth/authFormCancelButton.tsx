import React from "react";

export const AuthFormCancelButton = (props: { onClick: () => void }) => (
  <a
    className="flex justify-center items-center cursor-pointer select-none bg-yellow-400 text-white text-xl font-bold w-12 h-12 rounded-full"
    onClick={props.onClick}
  >
    X
  </a>
);
