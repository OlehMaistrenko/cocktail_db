import CocktailData from "@/types/CocktailData";
const getCocktails = async (string: string = "") => {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + string
  );
  const data = await res.json();
  try {
    const cocktailsData: CocktailData[] = data.drinks.map(
      (drink: { idDrink: string; strDrink: string; strDrinkThumb: string }) => {
        const cocktail: CocktailData = {
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
          ingredients: [],
        };
        return cocktail;
      }
    );
    return cocktailsData;
  } catch (err) {
    return [];
  }
};

export default getCocktails;
