export interface Meal {
  id: string;
  date: string;
  recipe: string;
  groupId: string;
  participating: string[];
  rating?: number;
}
