import { FieldMetaState } from "react-final-form";
import React from "react";

export const InvalidInput = (props: { meta: FieldMetaState<any> }) => (
  <div
    className={`h-0.5 w-full ${
      props.meta.touched && props.meta.error ? "bg-red-300" : "bg-gray-200"
    }`}
  />
);
