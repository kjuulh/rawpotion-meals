import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../redux/store";
import firebase from "firebase";
import { commentConverter } from "./commentConverter";
import {
  Comment,
  commentsSlice,
  optimisticAddCommentForMeal,
} from "./commentsSlice";

export const addCommentForMealAsync = createAsyncThunk(
  "comments/addForMeal",
  async (params: { mealId: string; text: string }, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;

    const commentRef = firebase
      .firestore()
      .collection("meals")
      .doc(params.mealId)
      .collection("comments")
      .withConverter(commentConverter)
      .doc();

    const comment: Comment = {
      id: commentRef.id,
      date: "today - todo",
      mealId: params.mealId,
      authorId: state.user.userId,
      text: params.text,
    };

    thunkAPI.dispatch(
      commentsSlice.actions.optimisticAddCommentForMeal({
        ...comment,
        persisted: false,
      })
    );

    await commentRef.set(comment);

    let commentDoc = await commentRef.get();
    if (!commentDoc.exists) {
      return thunkAPI.rejectWithValue("comment could not be created");
    }

    return commentDoc.data();
  }
);
