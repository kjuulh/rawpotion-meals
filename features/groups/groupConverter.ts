import { Group } from "./group";

export const groupConverter = {
  toFirestore: (group): Group => ({
    ...group,
  }),
  fromFirestore: (snapshot, options): Group => {
    const data = snapshot.data(options);
    return {
      ...data,
    };
  },
};
