type RequiredFormType = (value: string) => undefined | "Required";
export const required: RequiredFormType = (value) =>
  value ? undefined : "Required";
