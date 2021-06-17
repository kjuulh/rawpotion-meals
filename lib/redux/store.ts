import {
  configureStore,
  ThunkAction,
  Action,
  Middleware,
} from "@reduxjs/toolkit";

import user from "@features/user/userSlice";
import groups from "@features/groups/groupsSlice";
import currentGroup from "@features/currentGroup/currentGroupSlice";
import users from "@features/users/usersSlice";
import meals from "@features/meals/mealsSlice";
import comments from "@features/comments/commentsSlice";
import invitations from "@features/invitations/invitationsSlice";
import requests from "@features/requests/requestsSlice";
import mealRatings from "@features/mealRatings/mealRatingsSlice";
import recipes from "@features/recipes/recipesSlice";
import LogRocket from "logrocket";

export function makeStore() {
  return configureStore({
    reducer: {
      user,
      groups,
      currentGroup,
      users,
      meals,
      comments,
      invitations,
      requests,
      mealRatings,
      recipes,
    },
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV === "production"
        ? getDefaultMiddleware().concat(
            LogRocket.reduxMiddleware() as Middleware
          )
        : getDefaultMiddleware(),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
