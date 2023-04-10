import { CocktailData } from "@/types/CocktailData";
import classes from "../components/CocktailsList.module.css";
import { useRouter } from "next/router";

const CocktailsList: React.FC<{
  cocktailsData: CocktailData[];
}> = ({ cocktailsData }) => {
  const router = useRouter();
  if (cocktailsData.length === 1 && cocktailsData[0].id === "") {
    return (
      <div className={classes.cocktails}>
        <div className={classes.cocktailsNotFound}>cocktailsNotFound</div>
      </div>
    );
  }
  return (
    <div className={classes.cocktails}>
      {cocktailsData.map((cocktail: CocktailData) => {
        return (
          <div
            className={classes.cocktail}
            key={cocktail.id}
            onClick={() => {
              router.push("/" + cocktail.id);
            }}
          >
            <img src={cocktail.image} alt='' />
            <p>{cocktail.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CocktailsList;
