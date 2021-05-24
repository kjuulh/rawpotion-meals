import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../src/lib/redux/hooks";
import { getRecipeByIdAsync } from "../../../../src/lib/features/recipes/getRecipeByIdAsync";
import { selectRecipeById } from "../../../../src/lib/features/recipes/recipesSlice";
import dynamic from "next/dynamic";
import { selectUser } from "../../../../src/lib/features/user/userSlice";

const EditorContainer = dynamic(
  () => import("../../../../src/lib/components/editor/editorContainer"),
  {
    ssr: false,
  }
);

const RenderHtml = dynamic(
  () => import("../../../../src/lib/features/recipes/renderHtml"),
  {
    ssr: false,
  }
);

const RecipePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { recipeId } = router.query;

  const { userId } = useAppSelector(selectUser);

  const [loading, recipe] = useAppSelector(
    selectRecipeById(recipeId as string)
  );

  useEffect(() => {
    if (recipeId && typeof recipeId === "string") {
      dispatch(getRecipeByIdAsync(recipeId));
    }
  }, [recipeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return <div>Loading...</div>;
  }

  if (userId !== recipe.authorId) {
    return (
      <div>
        <h1>Recipe</h1>

        <RenderHtml recipeJSON={recipe.instructions} />
      </div>
    );
  }

  return (
    <div>
      <h1>Edit recipe page</h1>

      <EditorContainer recipe={recipe} />
    </div>
  );
};

export default RecipePage;
