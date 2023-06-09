"use client";
import CocktailData from "@/types/CocktailData";
import Link from "next/link";
import classes from "./CocktailsList.module.css";
import Image from "next/image";
import FavoriteBtn from "./FavoriteBtn";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CocktailState from "@/types/CocktailState";

export default function CocktailsListItem({
  cocktailData,
}: {
  cocktailData: CocktailData;
}) {
  const session = useSession();
  const [cocktailState, setCocktailState] = useState<CocktailState>({
    isLoading: false,
    isFavorite: cocktailData.isFavorite,
  });
  const favoriteClickHandlerUnsigned = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    signIn();
  };
  useEffect(() => {
    setCocktailState((prev) => {
      return { ...prev, isFavorite: cocktailData.isFavorite };
    });
  }, [cocktailData]);

  const favoriteClickHandlerSigned = async (
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    if (cocktailState.isLoading) {
      return;
    }
    let action = "add";
    if (cocktailState.isFavorite) {
      action = "remove";
    }
    setCocktailState((prev) => {
      return { ...prev, isLoading: true };
    });
    let res = await fetch("/api/favorites/" + action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...cocktailData, isFavorite: true }),
    });
    const result = await res.json();

    if (result) {
      setCocktailState((prev) => {
        return {
          isFavorite: action === "add" ? true : false,
          isLoading: false,
        };
      });
    } else {
      setCocktailState((prev) => {
        return { ...prev, isLoading: false };
      });
    }
  };
  return (
    <Link key={cocktailData.id} href={"/" + cocktailData.id}>
      <div className={classes.cocktail}>
        <div className={classes.imageWrap}>
          <Image
            src={cocktailData.image}
            alt={cocktailData.name}
            width={300}
            height={300}
          />
          <FavoriteBtn
            onClick={
              session.data
                ? favoriteClickHandlerSigned
                : favoriteClickHandlerUnsigned
            }
            isFavorite={cocktailState.isFavorite}
            isLoading={cocktailState.isLoading}
          />
        </div>
        <p>{cocktailData.name}</p>
      </div>
    </Link>
  );
}
