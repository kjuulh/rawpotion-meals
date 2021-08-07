import { FC } from "react";

export const Card: FC = (props) => (
  <div className="space-y-8 shadow-lg rounded-xl p-6">{props.children}</div>
);
