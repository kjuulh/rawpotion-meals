import { useRouter } from "next/router";
import { MealVm } from "@lib/api";

export const MealItem = ({
  meal: { groupId, id, recipe, date },
}: {
  meal: MealVm;
}) => {
  const router = useRouter();

  return (
    <li className="border-b-2 border-gray-100">
      <div
        className="p-4 cursor-pointer hover:underline hover:text-yellow-500 flex flex-row"
        onClick={() => router.push(`/groups/${groupId}/meals/${id}`)}
      >
        <p className="flex-1">{recipe}</p>
        <p className="text-sm">{date}</p>
      </div>
    </li>
  );
};
