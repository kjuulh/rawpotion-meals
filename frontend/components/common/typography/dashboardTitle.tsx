import { FC } from "react";

export const DashboardTitle: FC = (props) => (
  <h1 className="text-2xl text-yellow-500 font-semibold tracking-wide">
    {props.children}
  </h1>
);
