import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@lib/redux/store";
import { createInvitationAsync } from "./createInvitationAsync";
import { getInvitationsForGroupAsync } from "./getInvitationsForGroupAsync";
import { getInvitationAsync } from "./getInvitationAsync";

export interface Invitation {
  id: string;
  groupId: string;
  persisted?: false;
}

export interface InvitationsState {
  state: "not-called" | "called";
  status: "idle" | "loading" | "failure";
  invitations: Invitation[];
}

const initialState: InvitationsState = {
  invitations: [],
  status: "idle",
  state: "not-called",
};

export const invitationConverter = {
  toFirestore: (data): Invitation => ({
    ...data,
  }),
  fromFirestore: (snapshot, options): Invitation => {
    const data = snapshot.data(options);
    return {
      ...data,
    };
  },
};

export const invitationsSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    optimisticAddInvitation: (state, action: PayloadAction<Invitation>) => {
      state.invitations = [
        {
          ...action.payload,
          persisted: false,
        },
        ...state.invitations,
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createInvitationAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(createInvitationAsync.fulfilled, (state, action) => {
      state.state = "called";
      state.status = "idle";
      state.invitations = [
        action.payload,
        ...state.invitations.filter((i) => i.id !== action.payload.id),
      ];
    });

    builder.addCase(getInvitationsForGroupAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getInvitationsForGroupAsync.fulfilled, (state, action) => {
      state.state = "called";
      state.status = "idle";
      state.invitations = [
        ...state.invitations.filter(
          (i) => !action.payload.find((p) => p.id === i.id)
        ),
        ...action.payload,
      ];
    });

    builder.addCase(getInvitationAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getInvitationAsync.fulfilled, (state, action) => {
      state.state = "called";
      state.status = "idle";
      state.invitations = [
        ...state.invitations.filter((i) => i.id !== action.payload.id),
        action.payload,
      ];
    });
  },
});

export const { optimisticAddInvitation } = invitationsSlice.actions;

export const selectInvitationForGroup =
  (groupId: string) =>
  (state: AppState): [boolean, Invitation[]] =>
    [
      state.invitations.state !== "called" &&
        state.invitations.status === "loading",
      state.invitations.invitations.filter((i) => i.groupId === groupId),
    ];

export const selectInvitation =
  (invitationId: string) =>
  (state: AppState): [boolean, Invitation] =>
    [
      state.invitations.state !== "called" &&
        state.invitations.status === "loading",
      state.invitations.invitations.find((i) => i.id === invitationId),
    ];

export default invitationsSlice.reducer;
