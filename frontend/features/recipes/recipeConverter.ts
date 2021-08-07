import { Recipe } from "./recipesSlice";

export const recipeConverter = {
  toFirestore: (data): Recipe => ({
    ...data,
  }),
  fromFirestore: (snapshot, options): Recipe => {
    const data = snapshot.data(options);
    return {
      ...data,
    };
  },
};
