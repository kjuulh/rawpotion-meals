import { OutlinedButton } from "@components/common/buttons/outlinedButton";
import { useRouter } from "next/router";
import { Card } from "@components/common/card/card";
import { CardTitle } from "@components/common/card/cardTitle";
import { MealItem } from "@features/meals/mealItem";
import { MealVm } from "@lib/api";

export const Meals = (props: {
  meals: MealVm[];
  groupId: number;
  limit?: number;
  order?: "newest";
  hide?: "old";
}) => {
  const { meals } = props;

  const router = useRouter();
  return (
    <Card>
      <CardTitle>Upcoming Meals</CardTitle>
      {meals.length === 0 ? (
        <div>Empty...</div>
      ) : (
        <ul>
          {meals.slice(0, props.limit ? props.limit : 10000).map((m) => (
            <MealItem key={m.id} meal={m} />
          ))}
        </ul>
      )}

      <OutlinedButton
        onClick={() => router.push(`/groups/${props.groupId}/create-event`)}
      >
        Create meal event
      </OutlinedButton>
    </Card>
  );
};
