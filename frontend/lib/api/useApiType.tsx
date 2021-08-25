export interface UseApiType<T> {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  data: T;
}
