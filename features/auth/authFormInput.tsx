import React, { FC, InputHTMLAttributes } from "react";
import { Field } from "react-final-form";
import { required } from "./utility";
import { InvalidInput } from "./invalidInput";
import styles from "./authFormInput.module.css";

interface AuthFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  text: string;
}

const AuthFormInput: FC<AuthFormInputProps> = (props) => (
  <Field
    name={props.name}
    validate={required}
    render={({ input, meta }) => (
      <div className="transition-all">
        <label className="hidden">{props.text}</label>
        <input {...props} {...input} className={styles.authFormInput} />
        <InvalidInput meta={meta} />
      </div>
    )}
  />
);

export default AuthFormInput;
