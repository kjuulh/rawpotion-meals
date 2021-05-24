import { MealRating } from "./mealRating";

export const mealRatingConverter = {
  toFirestore: (data): MealRating => ({
    ...data,
  }),
  fromFirestore: (snapshot, options): MealRating => {
    const data = snapshot.data(options);
    return {
      ...data,
    };
  },
};
