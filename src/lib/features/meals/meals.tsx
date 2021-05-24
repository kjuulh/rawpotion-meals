import { useAppSelector } from "../../redux/hooks";
import { selectMealsByGroupId } from "./mealsSlice";
import { MealItem } from "./mealItem";

export const Meals = (props: {
  groupId: string;
  limit?: number;
  order?: "newest";
  hide?: "old";
}) => {
  const meals = useAppSelector(selectMealsByGroupId(props.groupId));

  return (
    <ul>
      {meals.slice(0, props.limit ? props.limit : 10000).map((m) => (
        <MealItem key={m.id} meal={m} />
      ))}
    </ul>
  );
};
