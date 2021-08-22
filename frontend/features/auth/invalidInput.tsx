import { FieldMetaState } from "react-final-form";
import React, { FC } from "react";

export const InvalidInput: FC<{ meta: FieldMetaState<any> }> = (props) => (
  <div
    className={`h-0.5 w-full ${
      props.meta.touched && props.meta.error ? "bg-red-300" : "bg-gray-200"
    }`}
  />
);
