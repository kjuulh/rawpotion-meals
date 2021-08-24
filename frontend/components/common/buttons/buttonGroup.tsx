import { FC } from "react";

export const ButtonGroup: FC = ({ children }) => (
  <div className="flex flex-row gap-4">{children}</div>
);
