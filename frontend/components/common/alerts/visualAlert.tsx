import React, { FC } from "react";
import classNames from "classnames";

interface VisualAlertProps {
  active: boolean;
  type: "error" | "warning" | "information";
}

export const VisualAlert: FC<VisualAlertProps> = ({
  children,
  active,
  type = "information",
}) => (
  <>
    {active && (
      <div
        className={classNames("py-3 px-5 rounded-md font-medium", {
          "bg-red-500 text-white": type === "error",
          "bg-yellow-400 text-white": type === "warning",
          "border-2 border-yellow-500": type === "information",
        })}
      >
        <p>{children}</p>
      </div>
    )}
  </>
);
