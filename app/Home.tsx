"use client";
import CocktailsList from "../components/CocktailsList";
import { useState } from "react";
import CocktailData from "@/types/CocktailData";
import getCocktails from "@/app/api/getCocktails";

export default function Home({
  cocktailsData,
}: {
  cocktailsData: CocktailData[];
}) {
  const [cocktails, setCocktails] = useState(cocktailsData);
  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cocktailsData = await getCocktails(e.target.value);
    setCocktails(cocktailsData);
  };

  return (
    <>
        <input onInput={handleSearchInput} placeholder='Search cocktail' />
        <CocktailsList cocktailsData={cocktails}></CocktailsList>
    </>
  );
}
