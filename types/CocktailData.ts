import CocktailIngredient from "./CocktailIngredient";

type CocktailData = {
  id: string;
  name: string;
  image: string;
  isFavorite?: boolean;
  ingredients: CocktailIngredient[];
};
export default CocktailData;
