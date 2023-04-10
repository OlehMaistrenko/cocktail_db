export type CocktailData = {
  id: string;
  name: string;
  image: string;
  ingredients?: [{ name: string; amount: string }];
};
