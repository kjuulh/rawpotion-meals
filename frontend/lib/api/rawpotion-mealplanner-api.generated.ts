import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./customBaseQueryWithAuthentication";
export const api = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: [],
  endpoints: (build) => ({
    authenticateUser: build.mutation<
      AuthenticateUserApiResponse,
      AuthenticateUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/authentication`,
        method: "POST",
        body: queryArg.authenticateUserRequest,
      }),
    }),
    refreshUserToken: build.query<
      RefreshUserTokenApiResponse,
      RefreshUserTokenApiArg
    >({
      query: () => ({ url: `/api/authentication/refresh-token` }),
    }),
    createGroup: build.mutation<CreateGroupApiResponse, CreateGroupApiArg>({
      query: (queryArg) => ({
        url: `/api/groups`,
        method: "POST",
        body: queryArg.createGroupRequest,
      }),
    }),
    getGroupById: build.query<GetGroupByIdApiResponse, GetGroupByIdApiArg>({
      query: (queryArg) => ({ url: `/api/groups/${queryArg.groupId}` }),
    }),
    createMeal: build.mutation<CreateMealApiResponse, CreateMealApiArg>({
      query: (queryArg) => ({
        url: `/api/meals`,
        method: "POST",
        body: queryArg.createMealRequest,
      }),
    }),
    registerUserAccount: build.mutation<
      RegisterUserAccountApiResponse,
      RegisterUserAccountApiArg
    >({
      query: (queryArg) => ({
        url: `/api/user`,
        method: "POST",
        body: queryArg.registerUserRequest,
      }),
    }),
    getGroupsForUser: build.query<
      GetGroupsForUserApiResponse,
      GetGroupsForUserApiArg
    >({
      query: (queryArg) => ({ url: `/api/user/${queryArg.userId}/groups` }),
    }),
    getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
      query: (queryArg) => ({ url: `/api/user/${queryArg.userId}` }),
    }),
    getWeatherForecast: build.query<
      GetWeatherForecastApiResponse,
      GetWeatherForecastApiArg
    >({
      query: () => ({ url: `/WeatherForecast` }),
    }),
  }),
});
export type AuthenticateUserApiResponse =
  /** status 200 Success */ AuthenticateUserResponse;
export type AuthenticateUserApiArg = {
  authenticateUserRequest: AuthenticateUserRequest;
};
export type RefreshUserTokenApiResponse =
  /** status 200 Success */ AuthenticationResponse;
export type RefreshUserTokenApiArg = {};
export type CreateGroupApiResponse = /** status 200 Success */ GroupDto;
export type CreateGroupApiArg = {
  createGroupRequest: CreateGroupRequest;
};
export type GetGroupByIdApiResponse = /** status 200 Success */ GroupDto;
export type GetGroupByIdApiArg = {
  groupId: number;
};
export type CreateMealApiResponse = /** status 200 Success */ MealDto;
export type CreateMealApiArg = {
  createMealRequest: CreateMealRequest;
};
export type RegisterUserAccountApiResponse =
  /** status 200 Success */ RegisterUserResponse;
export type RegisterUserAccountApiArg = {
  registerUserRequest: RegisterUserRequest;
};
export type GetGroupsForUserApiResponse = /** status 200 Success */ GroupDto[];
export type GetGroupsForUserApiArg = {
  userId: number;
};
export type GetUserByIdApiResponse = /** status 200 Success */ UserDto;
export type GetUserByIdApiArg = {
  userId: number;
};
export type GetWeatherForecastApiResponse =
  /** status 200 Success */ WeatherForecast[];
export type GetWeatherForecastApiArg = {};
export type AuthenticateUserResponse = {
  accessToken?: string | null;
  userId?: number;
  email?: string | null;
};
export type AuthenticateUserRequest = {
  email: string;
  password: string;
};
export type AuthenticationResponse = {
  id: number;
  username: string;
  email: string;
  accessToken: string;
};
export type UserDto = {
  id: number;
  username: string;
  email: string;
};
export type GroupDto = {
  id: number;
  name: string;
  admin: UserDto;
  members: UserDto[];
};
export type CreateGroupRequest = {
  name: string;
};
export type MealDto = {
  id?: number;
  host?: UserDto;
  group?: GroupDto;
  recipe?: string | null;
  date?: string | null;
};
export type CreateMealRequest = {
  recipe: string;
  groupId: number;
  date: string;
};
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
export const {
  useAuthenticateUserMutation,
  useRefreshUserTokenQuery,
  useCreateGroupMutation,
  useGetGroupByIdQuery,
  useCreateMealMutation,
  useRegisterUserAccountMutation,
  useGetGroupsForUserQuery,
  useGetUserByIdQuery,
  useGetWeatherForecastQuery,
} = api;

