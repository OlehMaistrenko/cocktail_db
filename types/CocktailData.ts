export type CocktailIngredient = { name: string; amount: string };

type CocktailData = {
  id: string;
  name: string;
  image: string;
  ingredients: CocktailIngredient[];
};
export default CocktailData;
