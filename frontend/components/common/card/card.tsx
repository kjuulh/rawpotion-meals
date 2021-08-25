import React, { FC, InputHTMLAttributes } from "react";
import { Field } from "react-final-form";
import { required } from "@lib/forms/utility";

export const Card: FC = (props) => (
  <div className="space-y-8 shadow-lg rounded-xl p-6">{props.children}</div>
);

interface CardFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fullWidth?: boolean;
}

export const CardFormInput: FC<CardFormInputProps> = ({
  fullWidth,
  ...props
}) => (
  <Field
    name={props.name}
    validate={required}
    render={({ input, meta }) => (
      <div className="space-y-3">
        <label className="text-lg">{props.label}</label>
        <br />
        <div>
          <input
            className={`py-2 px-4 border-2 focus:border-yellow-300 rounded-md ${
              meta.touched && meta.error ? "border-red-500" : "border-gray-200"
            } ${fullWidth ? "min-w-full" : ""}`}
            {...props}
            {...input}
          />
          {meta.touched && meta.error && (
            <p className="text-red-500">{meta.error}</p>
          )}
        </div>
      </div>
    )}
  />
);
