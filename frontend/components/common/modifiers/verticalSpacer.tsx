import React, { FC } from "react";

export const VerticalSpacer: FC<{ amount: number }> = (props) => (
  <div className={`space-y-${props.amount}`}>{props.children}</div>
);
