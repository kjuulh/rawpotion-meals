import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../redux/store";
import { getGroupsForMemberAsync } from "./getGroupsForMemberAsync";
import { createGroupAsync } from "./createGroupAsync";
import { getGroupByIdAsync } from "./getGroupByIdAsync";
import { Group } from "./group";
import { joinGroupAsync } from "./joinGroupAsync";

export interface GroupState {
  state: "not-called" | "called" | "created";
  status: "idle" | "loading" | "failed";
  groups: Group[];
}

const initialState: GroupState = {
  state: "not-called",
  status: "idle",
  groups: [],
};

export const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    resetGroupState: (state) => {
      state.state = "not-called";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createGroupAsync.pending, (state, action) => {
      state.state = "called";
      state.status = "loading";
    });
    builder.addCase(createGroupAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "created";
      state.groups = [action.payload, ...state.groups];
    });
    builder.addCase(createGroupAsync.rejected, (state, action) => {
      console.error(action.payload);
      state.status = "failed";
    });

    builder.addCase(getGroupByIdAsync.pending, (state) => {
      state.state = "called";
      state.status = "loading";
    });
    builder.addCase(getGroupByIdAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.groups = [
        ...state.groups.filter((g) => g.id !== action.payload.id),
        {
          ...action.payload.data(),
          id: action.payload.id,
        },
      ];
    });

    builder.addCase(getGroupsForMemberAsync.pending, (state) => {
      state.state = "called";
      state.status = "loading";
    });
    builder.addCase(getGroupsForMemberAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.groups = action.payload;
    });

    builder.addCase(joinGroupAsync.pending, (state) => {
      state.state = "called";
      state.status = "loading";
    });
    builder.addCase(joinGroupAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.groups = [...state.groups, action.payload];
    });
  },
});

export const { resetGroupState } = groupSlice.actions;

export const selectGroups = (state: AppState): Group[] => state.groups.groups;
export const selectGroupById =
  (id: string) =>
  (state: AppState): Group | undefined =>
    state.groups.groups.find((g) => g.id === id);

export const selectHasBeenCreated = (state: AppState): [boolean, Group] => [
  state.groups.state === "created",
  state.groups.groups[0],
];

export default groupSlice.reducer;
