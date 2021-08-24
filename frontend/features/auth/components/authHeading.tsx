import React, { FC } from "react";

export const AuthHeading: FC = (props) => (
  <div className="font-bold text-4xl flex justify-between">
    {props.children}
  </div>
);
