import { useEffect, useState } from "react";

export const RenderHtml = (props: { recipeJSON: string }) => {
  const [recipeHtml, setRecipeHtml] = useState();

  useEffect(() => {
    if (props.recipeJSON && typeof window !== "undefined") {
      const parsedRecipe = JSON.parse(props.recipeJSON);
      setRecipeHtml(parsedRecipe);
    }
  }, [props.recipeJSON]);

  if (!recipeHtml) {
    return <div>Loading...</div>;
  }

  return <div></div>;
};

export default RenderHtml;
