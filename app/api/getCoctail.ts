import CocktailData from "@/types/CocktailData";
import axios from "axios";

const getCocktail = async (id: string | string[] | undefined) => {
  const result = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data: CocktailData = {
    id: result.data.drinks[0].idDrink,
    name: result.data.drinks[0].strDrink,
    image: result.data.drinks[0].strDrinkThumb,
    ingredients: [],
  };

  for (let i = 1; i < 16; i++) {
    if (result.data.drinks[0]["strIngredient" + i] !== null) {
      const name: string = result.data.drinks[0]["strIngredient" + i];
      const amount: string = result.data.drinks[0]["strMeasure" + i];
      data.ingredients.push({
        name,
        amount,
      });
    }
  }
  return data;
};
export default getCocktail;
