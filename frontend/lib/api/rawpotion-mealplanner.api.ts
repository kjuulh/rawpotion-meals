import { api as generatedApi } from "./rawpotion-mealplanner-api.generated";

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: ["User"],
});

export const {
  useAuthenticateUserMutation,
  useGetWeatherForecastQuery,
  useRegisterUserAccountMutation,
  useCreateGroupMutation,
  useGetGroupByIdQuery,
  useGetUserByIdQuery,
  useCreateMealMutation,
} = api;

export const { authenticateUser } = api.endpoints;
