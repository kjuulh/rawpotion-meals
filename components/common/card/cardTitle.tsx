import { FC, HTMLAttributes } from "react";
import classNames from "classnames";

type CardTitleProps = HTMLAttributes<HTMLHeadElement>;
export const CardTitle: FC<CardTitleProps> = (props) => (
  <h2 className={classNames("text-lg text-yellow-500 ", props.className)}>
    {props.children}
  </h2>
);
