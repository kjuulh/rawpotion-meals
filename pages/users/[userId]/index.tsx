import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import { getUsersAsync } from "@features/users/getUsersAsync";
import { selectUserById } from "@features/users/usersSlice";
import { getRecipesForUser } from "@features/recipes/getRecipesForUser";
import { Recipe, selectRecipesForUser } from "@features/recipes/recipesSlice";

const RecipeItem = (props: { recipe: Recipe; userId: string }) => {
  const router = useRouter();

  return (
    <div>
      <p>{props.recipe.name}</p>
      {props.recipe.authorId === props.userId && (
        <button
          onClick={() =>
            router.push({
              pathname: `${router.route}/recipes/[recipeId]`,
              query: {
                userId: props.userId,
                recipeId: props.recipe.id,
              },
            })
          }
        >
          Edit
        </button>
      )}
    </div>
  );
};

const Recipes = (props: { userId: string }) => {
  const dispatch = useAppDispatch();

  const [loading, recipes] = useAppSelector(
    selectRecipesForUser(props.userId as string)
  );

  useEffect(() => {
    if (props.userId) {
      dispatch(getRecipesForUser(props.userId));
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipes) {
    return null;
  }

  if (recipes.length === 0) {
    return <div>Empty</div>;
  }

  return (
    <ul>
      {recipes.map((r) => (
        <li key={r.id}>
          <RecipeItem {...props} recipe={r} />
        </li>
      ))}
    </ul>
  );
};

function RecipesForUser(props: { userId: string }) {
  return (
    <div>
      <h2>Recipes</h2>

      <Recipes {...props} />
    </div>
  );
}

const UsersPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUserById(userId as string));

  useEffect(() => {
    if (userId && typeof userId === "string") {
      dispatch(getUsersAsync([userId]));
    }
  }, [userId]);

  if (!user) {
    return <div>Not found...</div>;
  }

  return (
    <div>
      <h1>User: {user.name}</h1>

      <p>Email: {user.email}</p>

      <RecipesForUser userId={userId as string} />

      <button
        onClick={() =>
          router.push({
            pathname: `${router.route}/recipe/create`,
            query: { userId },
          })
        }
      >
        Create recipe
      </button>
    </div>
  );
};

export default UsersPage;
