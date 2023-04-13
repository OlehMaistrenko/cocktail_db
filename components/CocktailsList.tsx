import { CocktailData } from "@/types/CocktailData";
import classes from "../components/CocktailsList.module.css";
import Link from "next/link";
import Image from "next/image";

const CocktailsList: React.FC<{
  cocktailsData: CocktailData[];
}> = ({ cocktailsData }) => {
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
        return (
          <Link key={cocktail.id} href={"/" + cocktail.id}>
            <div className={classes.cocktail}>
              <Image
                src={cocktail.image}
                alt={cocktail.name}
                width={300}
                height={300}
              />
              <p>{cocktail.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CocktailsList;
