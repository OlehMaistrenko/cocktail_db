import classes from "./CocktailDetail.module.css";
import CocktailData from "@/types/CocktailData";
import Image from "next/image";
import Link from "next/link";

const CocktailDetail: React.FC<{
  cocktailData: CocktailData;
}> = ({ cocktailData }) => {
  return (
    <div className={classes.cocktail}>
      <Link href='/' className={classes.backBtn} />
      <div className={classes.cocktailImage}>
        <Image
          src={cocktailData.image}
          alt='cocktail image'
          width={384}
          height={384}
          priority={true}
        />
      </div>
      <div className={classes.cocktailDetais}>
        <div className={classes.cocktailTitle}>{cocktailData.name}</div>
        {cocktailData.ingredients.length > 0 && (
          <ul className={classes.ingredients}>
            {cocktailData.ingredients.map((ingredient) => {
              return (
                <li key={cocktailData.id + ingredient.name}>
                  <b>{ingredient.name}:</b> {ingredient.amount}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CocktailDetail;
