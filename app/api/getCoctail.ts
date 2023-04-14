import CocktailData from "@/types/CocktailData";

const getCocktail = async (id: string | string[] | undefined) => {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  const cocktailData: CocktailData = {
    id: data.drinks[0].idDrink,
    name: data.drinks[0].strDrink,
    image: data.drinks[0].strDrinkThumb,
    ingredients: [],
  };

  for (let i = 1; i < 16; i++) {
    if (data.drinks[0]["strIngredient" + i] !== null) {
      const name: string = data.drinks[0]["strIngredient" + i];
      const amount: string = data.drinks[0]["strMeasure" + i];
      cocktailData.ingredients.push({
        name,
        amount,
      });
    }
  }
  return cocktailData;
};
export default getCocktail;
