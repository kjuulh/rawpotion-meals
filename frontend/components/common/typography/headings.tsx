import { FC, HTMLAttributes } from "react";
import classNames from "classnames";

export const Headings: FC<HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h1
    className={classNames(
      "text-2xl text-yellow-500 font-semibold tracking-wide",
      props.className
    )}
  >
    {props.children}
  </h1>
);

export const SubHeading: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
}) => (
  <h2 className={classNames("text-lg font-medium tracking-wide", className)}>
    {children}
  </h2>
);
