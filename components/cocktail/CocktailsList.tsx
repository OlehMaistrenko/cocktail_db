import CocktailData from "@/types/CocktailData";
import classes from "./CocktailsList.module.css";
import CocktailsListItem from "./CocktailsListItem";

export default function CocktailsList({
  cocktailsData,
}: {
  cocktailsData: CocktailData[];
}) {
  if (!cocktailsData.length) {
    return (
      <div className={classes.cocktails}>
        <div className={classes.cocktailsNotFound}>cocktailsNotFound</div>
      </div>
    );
  }
  return (
    <div className={classes.cocktails}>
      {cocktailsData.map((cocktail: CocktailData) => {
        return <CocktailsListItem key={cocktail.id} cocktailData={cocktail} />;
      })}
    </div>
  );
}
