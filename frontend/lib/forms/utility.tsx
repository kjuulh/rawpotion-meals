type RequiredFormType = (value: boolean) => undefined | "Required";
export const required: RequiredFormType = (value) =>
  value ? undefined : "Required";
