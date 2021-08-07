import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: [],
  endpoints: (build) => ({
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: (queryArg) => ({
        url: `/api/user`,
        method: "POST",
        body: queryArg.registerUserRequest,
      }),
    }),
    getWeatherForecast: build.query<
      GetWeatherForecastApiResponse,
      GetWeatherForecastApiArg
    >({
      query: () => ({ url: `/WeatherForecast` }),
    }),
  }),
});
export type CreateUserApiResponse =
  /** status 200 Success */ RegisterUserResponse;
export type CreateUserApiArg = {
  registerUserRequest: RegisterUserRequest;
};
export type GetWeatherForecastApiResponse =
  /** status 200 Success */ WeatherForecast[];
export type GetWeatherForecastApiArg = {};
export type RegisterUserResponse = {
  id: number;
  username: string;
};
export type RegisterUserRequest = {
  username: string;
  email: string;
  password: string;
};
export type WeatherForecast = {
  date?: string;
  temperatureC?: number;
  temperatureF?: number;
  summary?: string | null;
};
export const { useCreateUserMutation, useGetWeatherForecastQuery } = api;

