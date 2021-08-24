import React, { FC } from "react";
import { PrimaryButton } from "@components/common";

interface AuthFormButtonProps {
  disabled?: boolean;
  loading?: boolean;
}
export const AuthFormButton: FC<AuthFormButtonProps> = (props) => (
  <PrimaryButton tabIndex={1} type="submit" disabled={props.disabled}>
    {props.children}
  </PrimaryButton>
);
