import React, { FC } from "react";
import Link from "next/link";

export const AuthFormLink: FC<{ href: string }> = (props) => (
  <div className="text-center text-gray-700 hover:underline">
    <Link href={props.href}>{props.children}</Link>
  </div>
);
