import React from "react";

export const AuthFormButton = (props) => (
  <button className="w-full py-4 bg-yellow-500 text-white rounded-full uppercase text-xl font-bold outline-none focus:outline-none active:outline-none highlight-none hover:bg-yellow-700 focus:bg-yellow-700">
    {props.children}
  </button>
);
