import firebase from "firebase";

export interface MealTimestamp {
  seconds: number;
  nanoseconds: number;
}

export const getDateFromTimestamp = (
  ts: MealTimestamp
): firebase.firestore.Timestamp =>
  firebase.firestore.Timestamp.fromDate(new Date(ts.seconds * 1000));

export interface Meal {
  id: string;
  date: MealTimestamp;
  recipe: string;
  groupId: string;
  participating: string[];
  rating?: number;
}
