import CocktailData from "@/types/CocktailData";
import axios from "axios";
const getCocktails = async (string: string = "") => {
  const result = await axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + string
  );
  try {
    const cocktailsData: CocktailData[] = result.data.drinks.map(
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
