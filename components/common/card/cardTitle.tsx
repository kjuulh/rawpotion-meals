import { FC } from "react";

export const CardTitle: FC = (props) => (
  <h2 className="text-lg text-yellow-500">{props.children}</h2>
);
