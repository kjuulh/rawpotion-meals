import { api as generatedApi } from "./rawpotion-mealplanner-api.generated";

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: ["User", "Meal", "Group", "MealParticipation"],
  endpoints: {
    getMealById: {
      providesTags: (result) =>
        result
          ? [{ type: "Meal", id: result.id }]
          : [{ type: "Meal", id: "LIST" }],
    },
    participateInMeal: {
      invalidatesTags: (result) =>
        result ? [{ type: "Meal", id: result.id }] : [],
    },
    dontParticipateInMeal: (endpoint) => {
      // endpoint.providesTags = (result) => (result ? [] : []);
      endpoint.invalidatesTags = (result) =>
        result ? [{ type: "Meal", id: result.id }] : [];
    },
  },
});

export const {
  useAuthenticateUserMutation,
  useGetWeatherForecastQuery,
  useRegisterUserAccountMutation,
  useCreateGroupMutation,
  useGetGroupByIdQuery,
  useGetUserByIdQuery,
  useCreateMealMutation,
  useGetMealByIdQuery,
  useGetGroupsForUserQuery,
  useDontParticipateInMealMutation,
  useParticipateInMealMutation,
  useRefreshUserTokenQuery,
  useGetInvitationsForGroupQuery,
  useCreateInvitationForGroupMutation,
} = api;

export const { authenticateUser } = api.endpoints;
