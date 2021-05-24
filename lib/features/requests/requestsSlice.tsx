import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../redux/store";
import firebase from "firebase/app";

export interface ApiState {
  state: "called" | "not-called";
  status: "idle" | "loading" | "failure";
}

export interface Request {
  id: string;
  groupId: string;
  createdBy: string;
  recipe: string;
}

interface RequestsState extends ApiState {
  requests: Request[];
}

const initialState: RequestsState = {
  state: "not-called",
  status: "idle",
  requests: [],
};

export const requestConverter = {
  toFirestore: (data): Request => ({
    ...data,
  }),
  fromFirestore: (snapshot, options): Request => {
    const data = snapshot.data(options);
    return {
      ...data,
    };
  },
};

export const createRequestForGroupAsync = createAsyncThunk(
  "requests/createForGroup",
  async (params: { groupId: string; recipe: string }, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;

    if (!state.user.userId) {
      return thunkAPI.rejectWithValue("User is not logged in");
    }

    const requestDoc = firebase
      .firestore()
      .collection("requests")
      .withConverter(requestConverter)
      .doc();

    await requestDoc.set({
      id: requestDoc.id,
      createdBy: state.user.userId,
      groupId: params.groupId,
      recipe: params.recipe,
    });

    const request = await requestDoc.get();

    if (!request.exists) {
      return thunkAPI.rejectWithValue("could not creat request");
    }

    return request.data();
  }
);

export const getRequestsForGroup = createAsyncThunk(
  "requests/getForGroup",
  async (groupId: string, thunkAPI) => {
    const requestsDoc = await firebase
      .firestore()
      .collection("requests")
      .where("groupId", "==", groupId)
      .withConverter(requestConverter)
      .get();

    return requestsDoc.docs.map((d) => d.data());
  }
);

export const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRequestForGroupAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(createRequestForGroupAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "called";
      state.requests = [
        action.payload,
        ...state.requests.filter((r) => r.id !== action.payload.id),
      ];
    });

    builder.addCase(getRequestsForGroup.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getRequestsForGroup.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "called";
      state.requests = [
        ...state.requests.filter(
          (r) => !action.payload.find((p) => p.id === r.id)
        ),
        ...action.payload,
      ];
    });
  },
});

export const {} = requestsSlice.actions;

export const selectRequestsForGroup =
  (groupId: string) =>
  (state: AppState): [boolean, Request[]] =>
    [
      state.requests.status === "loading" &&
        state.requests.state === "not-called",
      state.requests.requests.filter((r) => r.groupId === groupId),
    ];

export default requestsSlice.reducer;
