import classes from "./CocktailDetail.module.css";
import { CocktailData } from "@/types/CocktailData";
import { useRouter } from "next/router";

const CocktailDetail: React.FC<{
  cocktailData: CocktailData;
}> = ({ cocktailData }) => {
  const router = useRouter();
  return (
    <div className={classes.cocktail}>
      <button
        className={classes.backBtn}
        onClick={() => {
          router.push("/");
        }}
      ></button>
      <div className={classes.cocktailImage}>
        <img src={cocktailData.image} alt='cocktail image' />
      </div>
      <div className={classes.cocktailDetais}>
        <div className={classes.cocktailTitle}>{cocktailData.name}</div>
        <ul className={classes.ingredients}>
          {cocktailData.ingredients?.map((ingredient) => {
            return (
              <li key={cocktailData.id + ingredient.name}>
                <b>{ingredient.name}:</b> {ingredient.amount}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CocktailDetail;
