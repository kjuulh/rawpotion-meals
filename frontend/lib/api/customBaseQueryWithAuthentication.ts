import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { signOutAsync, userIsSignedIn } from "@features/user/userSlice";
import { AppState } from "@lib/redux/store";
import { AuthenticationResponse } from "@lib/api/rawpotion-mealplanner-api.generated";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).user.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      "/api/authentication/refresh-token",
      api,
      extraOptions
    );
    if (refreshResult.data) {
      api.dispatch(
        userIsSignedIn(refreshResult.data as AuthenticationResponse)
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(signOutAsync());
    }
  }
  return result;
};
