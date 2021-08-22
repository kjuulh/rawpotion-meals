import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, AppState } from "@lib/redux/store";
import { toast } from "react-hot-toast";

const initialState = {};

interface SendToastAsyncArgs {
  message: string;
  type?: "information" | "success" | "loading" | "error";
}

export const sendToastAsync = createAsyncThunk<
  void,
  SendToastAsyncArgs,
  {
    dispatch: AppDispatch;
    state: AppState;
  }
>("toaster/send", ({ type = "information", message }) => {
  switch (type) {
    case "error":
      toast.error(message);
      break;
    case "information":
      toast(message);
      break;
    case "success":
      toast.success(message);
      break;
    case "loading":
      toast.loading(message);
      break;
  }
});

const toasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    builder.addCase(sendToastAsync.pending, (_) => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    builder.addCase(sendToastAsync.fulfilled, (_) => {});
  },
});

export default toasterSlice.reducer;
