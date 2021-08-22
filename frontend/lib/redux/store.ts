import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";

import user from "@features/user/userSlice";
import auth from "@features/auth/authSlice";
import toaster from "./toaster/toasterSlice";

import {setupListeners} from "@reduxjs/toolkit/query";
import {api} from "@lib/api";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const makeStore = () =>
  configureStore({
    reducer: {
      user,
      auth,
      toaster,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
