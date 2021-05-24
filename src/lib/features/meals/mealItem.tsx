import { useRouter } from "next/router";
import { Meal } from "./meal";

export const MealItem = ({ meal: { groupId, id, recipe } }: { meal: Meal }) => {
  const router = useRouter();

  return (
    <li>
      <div onClick={() => router.push(`/groups/${groupId}/meals/${id}`)}>
        <p>{recipe}</p>
      </div>
    </li>
  );
};
