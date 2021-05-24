import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "./store";
import { useEffect } from "react";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useDispatchOnMount = (action: ActionCreatorWithoutPayload) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(action);
  }, []);
};
