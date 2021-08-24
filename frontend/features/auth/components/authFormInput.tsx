import React, { FC, InputHTMLAttributes } from "react";
import { Field } from "react-final-form";
import { required } from "../utility";
import { InvalidInput } from "./invalidInput";

interface AuthFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  text: string;
}

export const AuthFormInput: FC<AuthFormInputProps> = (props) => (
  <Field
    name={props.name}
    validate={required}
    render={({ input, meta }) => (
      <div className="transition-all">
        <label className="hidden">{props.text}</label>
        <input
          {...props}
          {...input}
          className="text-center placeholder-yellow-500 w-full py-2 filter-none outline-none"
        />
        <InvalidInput meta={meta} />
      </div>
    )}
  />
);
