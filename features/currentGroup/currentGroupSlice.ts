import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase";
import { groupConverter } from "../groups/groupConverter";
import { AppState } from "@lib/redux/store";
import { Group } from "../groups/group";
import { getUsersAsync } from "../users/getUsersAsync";

type CurrentGroup = Group;

interface CurrentGroupState {
  state: "not-called" | "called";
  status: "idle" | "loading" | "failed";
  group?: CurrentGroup;
  errorMessage?: string;
}

const initialState: CurrentGroupState = {
  group: undefined,
  state: "not-called",
  status: "idle",
  errorMessage: undefined,
};

export const getCurrentGroupByIdAsync = createAsyncThunk(
  "currentGroup/getById",
  async (groupId: string, thunkAPI) => {
    const documentSnapshot = await firebase
      .firestore()
      .collection("groups")
      .withConverter(groupConverter)
      .doc(groupId)
      .get();
    if (!documentSnapshot.exists) {
      return thunkAPI.rejectWithValue("group was not found");
    }

    const group = { ...documentSnapshot.data() } as CurrentGroup;

    thunkAPI.dispatch(getUsersAsync(group.members));

    return group;
  }
);

export const currentGroupSlice = createSlice({
  name: "currentGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentGroupByIdAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getCurrentGroupByIdAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "called";
      state.group = action.payload;
    });

    builder.addCase(getCurrentGroupByIdAsync.rejected, (state, action) => {
      state.status = "failed";
      state.state = "called";
      state.group = undefined;
      state.errorMessage = action.payload as string;
    });
  },
});

export const selectGroup = (
  state: AppState
): [boolean, CurrentGroup | undefined] => {
  const { currentGroup } = state;

  return [
    currentGroup.status === "loading" && currentGroup.state !== "called",
    currentGroup.group,
  ];
};

export default currentGroupSlice.reducer;
