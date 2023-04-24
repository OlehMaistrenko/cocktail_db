import CocktailIngredient from "./CocktailIngredient";

type CocktailData = {
  id: string;
  name: string;
  image: string;
  ingredients: CocktailIngredient[];
};
export default CocktailData;
