import { Meal } from "./meal";

export const mealConverter = {
  toFirestore: (meal): Meal => ({
    ...meal,
  }),
  fromFirestore: (snapshot, options): Meal => {
    const data = snapshot.data(options);
    return {
      ...data,
    };
  },
};
