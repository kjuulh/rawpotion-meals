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
        body: queryArg.createGroupCommand,
      }),
    }),
    getGroupById: build.query<GetGroupByIdApiResponse, GetGroupByIdApiArg>({
      query: (queryArg) => ({ url: `/api/groups/${queryArg.groupId}` }),
    }),
    getInvitationsForGroup: build.query<
      GetInvitationsForGroupApiResponse,
      GetInvitationsForGroupApiArg
    >({
      query: (queryArg) => ({
        url: `/api/group/${queryArg.groupId}/invitations`,
      }),
    }),
    createInvitationForGroup: build.mutation<
      CreateInvitationForGroupApiResponse,
      CreateInvitationForGroupApiArg
    >({
      query: (queryArg) => ({
        url: `/api/group/${queryArg.groupId}/invitations`,
        method: "POST",
      }),
    }),
    createMeal: build.mutation<CreateMealApiResponse, CreateMealApiArg>({
      query: (queryArg) => ({
        url: `/api/meals`,
        method: "POST",
        body: queryArg.createMealForGroupCommand,
      }),
    }),
    getMealById: build.query<GetMealByIdApiResponse, GetMealByIdApiArg>({
      query: (queryArg) => ({ url: `/api/meals/${queryArg.mealId}` }),
    }),
    participateInMeal: build.mutation<
      ParticipateInMealApiResponse,
      ParticipateInMealApiArg
    >({
      query: (queryArg) => ({
        url: `/api/meals/${queryArg.mealId}/participate/${queryArg.userId}`,
        method: "POST",
      }),
    }),
    dontParticipateInMeal: build.mutation<
      DontParticipateInMealApiResponse,
      DontParticipateInMealApiArg
    >({
      query: (queryArg) => ({
        url: `/api/meals/${queryArg.mealId}/participate/${queryArg.userId}`,
        method: "DELETE",
      }),
    }),
    registerUserAccount: build.mutation<
      RegisterUserAccountApiResponse,
      RegisterUserAccountApiArg
    >({
      query: (queryArg) => ({
        url: `/api/user`,
        method: "POST",
        body: queryArg.registerUserCommand,
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
export type CreateGroupApiResponse = /** status 200 Success */ GroupVm;
export type CreateGroupApiArg = {
  createGroupCommand: CreateGroupCommand;
};
export type GetGroupByIdApiResponse = /** status 200 Success */ GroupVm;
export type GetGroupByIdApiArg = {
  groupId: number;
};
export type GetInvitationsForGroupApiResponse =
  /** status 200 Success */ InvitationsVm;
export type GetInvitationsForGroupApiArg = {
  groupId: number;
};
export type CreateInvitationForGroupApiResponse =
  /** status 200 Success */ InvitationVm;
export type CreateInvitationForGroupApiArg = {
  groupId: number;
};
export type CreateMealApiResponse = /** status 200 Success */ MealBriefVm;
export type CreateMealApiArg = {
  createMealForGroupCommand: CreateMealForGroupCommand;
};
export type GetMealByIdApiResponse = /** status 200 Success */ MealVm;
export type GetMealByIdApiArg = {
  mealId: number;
};
export type ParticipateInMealApiResponse = /** status 200 Success */ MealVm;
export type ParticipateInMealApiArg = {
  mealId: number;
  userId: number;
};
export type DontParticipateInMealApiResponse = /** status 200 Success */ MealVm;
export type DontParticipateInMealApiArg = {
  mealId: number;
  userId: number;
};
export type RegisterUserAccountApiResponse = /** status 200 Success */ UserVm;
export type RegisterUserAccountApiArg = {
  registerUserCommand: RegisterUserCommand;
};
export type GetGroupsForUserApiResponse = /** status 200 Success */ GroupsVm;
export type GetGroupsForUserApiArg = {
  userId: number;
};
export type GetUserByIdApiResponse = /** status 200 Success */ UserVm;
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
export type UserVm = {
  id: number;
  username: string;
  email: string;
};
export type MealBriefVm = {
  id: number;
  host: UserVm;
  groupId: number;
  recipe: string;
  date: string;
};
export type GroupVm = {
  id: number;
  name: string;
  admin: UserVm;
  members: UserVm[];
  meals: MealBriefVm[];
};
export type CreateGroupCommand = {
  name: string;
};
export type InvitationVm = {
  id?: number;
  group?: GroupVm;
  enabled?: boolean;
};
export type InvitationsVm = {
  invitations?: InvitationVm[] | null;
};
export type CreateMealForGroupCommand = {
  recipe: string;
  groupId: number;
  date: string;
};
export type MealVm = {
  id: number;
  host: UserVm;
  group: GroupVm;
  recipe: string;
  date: string;
  participatingMembers: UserVm[];
};
export type RegisterUserCommand = {
  username: string;
  email: string;
  password: string;
};
export type GroupsVm = {
  groups?: GroupVm[] | null;
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
  useGetInvitationsForGroupQuery,
  useCreateInvitationForGroupMutation,
  useCreateMealMutation,
  useGetMealByIdQuery,
  useParticipateInMealMutation,
  useDontParticipateInMealMutation,
  useRegisterUserAccountMutation,
  useGetGroupsForUserQuery,
  useGetUserByIdQuery,
  useGetWeatherForecastQuery,
} = api;

