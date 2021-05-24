import { User } from "./user";

export const userConverter = {
  toFirestore: (user): User => ({
    ...user,
  }),
  fromFirestore: (snapshot, options): User => {
    const data = snapshot.data(options);
    return {
      ...data,
    };
  },
};
