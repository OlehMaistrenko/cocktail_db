"use client";
import CocktailData from "@/types/CocktailData";
import Link from "next/link";
import classes from "./CocktailsList.module.css";
import Image from "next/image";
import FavoriteBtn from "./FavoriteBtn";
import { useEffect, useState } from "react";
import CocktailState from "@/types/CocktailState";
import { useRouter } from "next/navigation";
import useSession from "@/lib/useSession";

export default function CocktailsListItem({
  cocktailData,
}: {
  cocktailData: CocktailData;
}) {
  const router = useRouter();
  const user = useSession();
  const [cocktailState, setCocktailState] = useState<CocktailState>({
    isLoading: false,
    isFavorite: cocktailData.isFavorite,
  });
  const favoriteClickHandlerUnsigned = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push("/login");
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
    try {
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
      console.log(result);

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
    } catch {
      router.push("/login");
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
              user ? favoriteClickHandlerSigned : favoriteClickHandlerUnsigned
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
