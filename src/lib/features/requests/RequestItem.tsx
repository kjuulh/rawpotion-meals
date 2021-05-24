import { Request } from "./requestsSlice";
import React from "react";

export const RequestItem = (props: { request: Request }) => (
  <div>{props.request.recipe}</div>
);
