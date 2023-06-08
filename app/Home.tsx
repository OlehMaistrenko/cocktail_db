"use client";
import CocktailsList from "../components/cocktail/CocktailsList";
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
{/* @ts-expect-error Async Server Component */}
      <CocktailsList cocktailsData={cocktails}></CocktailsList>
    </>
  );
}
