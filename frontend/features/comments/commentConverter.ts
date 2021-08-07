import { Comment } from "./commentsSlice";

export const commentConverter = {
  toFirestore: (comment): Comment => ({
    ...comment,
  }),
  fromFirestore: (snapshot, options): Comment => {
    const data = snapshot.data(options);
    return {
      ...data,
    };
  },
};
