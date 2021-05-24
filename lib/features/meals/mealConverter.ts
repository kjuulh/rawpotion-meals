import { Meal } from "./meal";

export const mealConverter = {
  toFirestore: (data): Meal => ({
    ...data,
  }),
  fromFirestore: (snapshot, options): Meal => {
    const data = snapshot.data(options);
    return {
      ...data,
    };
  },
};
