import CocktailData from "@/types/CocktailData";
import classes from "./CocktailsList.module.css";
import Link from "next/link";
import Image from "next/image";
import FavoriteBtn from "./FavoriteBtn";
import { signIn } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function CocktailsList({ cocktailsData }:{
  cocktailsData: CocktailData[];
}) {
  const session = await getServerSession(authOptions);  
  if (!cocktailsData.length) {
    return (
      <div className={classes.cocktails}>
        <div>{ session?.user?.email}</div>
        <div className={classes.cocktailsNotFound}>cocktailsNotFound</div>
      </div>
    );
  }
  
  
  const favoriteClickHandlerUnsigned = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    signIn();
  }
  const favoriteClickHandlerSigned = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    signIn();
  }
  return (
    <div className={classes.cocktails}>
      {cocktailsData.map((cocktail: CocktailData) => {
        return (
          <Link key={cocktail.id} href={"/" + cocktail.id}>
            <div className={classes.cocktail}>
              <div className={classes.imageWrap}>
                <Image
                  src={cocktail.image}
                  alt={cocktail.name}
                  width={300}
                  height={300}
                />
                <FavoriteBtn onClick={session?favoriteClickHandlerUnsigned:favoriteClickHandlerSigned}/>
              </div>
              <p>{cocktail.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
