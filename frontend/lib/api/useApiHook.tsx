import { FormOnSubmit } from "@lib/forms/formOnSubmit";
import { UseApiType } from "@lib/api/useApiType";

export type UseApiHook<T> = () => [FormOnSubmit, UseApiType<T>];