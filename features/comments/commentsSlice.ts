import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCommentsForMealAsync } from "./getCommentsForMealAsync";
import { AppState } from "@lib/redux/store";
import { addCommentForMealAsync } from "./addCommentForMealAsync";

export interface Comment {
  id: string;
  mealId: string;
  authorId: string;
  replyId?: string;
  date: string;
  text: string;
  persisted?: false;
}

interface CommentsState {
  state: "not-called" | "called";
  status: "idle" | "loading" | "failure";
  comments: Comment[];
}

const initialState: CommentsState = {
  state: "not-called",
  status: "idle",
  comments: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    optimisticAddCommentForMeal: (state, action: PayloadAction<Comment>) => {
      state.comments = [action.payload, ...state.comments];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentsForMealAsync.pending, (state) => {
      state.status = "loading";
      state.state = "called";
    });
    builder.addCase(getCommentsForMealAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "called";
      state.comments = [
        ...state.comments.filter(
          (c) => !action.payload.find((p) => p.id === c.id)
        ),
        ...action.payload,
      ];
    });

    builder.addCase(addCommentForMealAsync.pending, (state) => {
      state.status = "loading";
      state.state = "called";
    });

    builder.addCase(addCommentForMealAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.state = "called";
      state.comments = [
        action.payload,
        ...state.comments.filter((c) => c.id !== action.payload.id),
      ];
    });
  },
});

export const selectCommentsForMeal =
  (mealId: string) =>
  (state: AppState): [boolean, Comment[]] =>
    [
      state.comments.status === "loading" && state.comments.state != "called",
      state.comments.comments.filter((c) => c.mealId === mealId),
    ];

export const { optimisticAddCommentForMeal } = commentsSlice.actions;

export default commentsSlice.reducer;
