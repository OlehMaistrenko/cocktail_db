export type CocktailIngredient = { name: string; amount: string };

export type CocktailData = {
  id: string;
  name: string;
  image: string;
  ingredients: CocktailIngredient[];
};
