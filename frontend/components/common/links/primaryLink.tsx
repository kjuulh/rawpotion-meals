import React, { AnchorHTMLAttributes, FC } from "react";
import Link from "next/link";
import classNames from "classnames";

export const PrimaryLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props
) => (
  <Link href={props.href}>
    <a
      className={classNames(
        "py-2 px-4 bg-yellow-500 rounded-lg text-white hover:bg-yellow-700 transition ",
        props.className
      )}
      {...props}
    >
      {props.children}
    </a>
  </Link>
);

export const OutlinedLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props
) => (
  <Link href={props.href}>
    <a
      {...props}
      className={classNames(
        `py-2 px-4 bg-white border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-100 hover:border-yellow-700 active:bg-yellow-300 hover:border-yellow-500 transition-all disabled:border-gray-500`,
        props.className
      )}
    >
      {props.children}
    </a>
  </Link>
);
