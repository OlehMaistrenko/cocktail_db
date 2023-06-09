"use client";
import CocktailsList from "../components/cocktail/CocktailsList";
import { useState, useEffect } from "react";
import CocktailData from "@/types/CocktailData";
import useDebounce from "@/hooks/useDebounce";

export default function Home({
  cocktailsData,
}: {
  cocktailsData: CocktailData[];
}) {
  const [cocktails, setCocktails] = useState<CocktailData[]>(cocktailsData);
  const [searchInputVal, setSearchInputVal] = useState<string>("");
  const debouncedSearchVal = useDebounce(searchInputVal, 700);
  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputVal(e.target.value);
  };
  useEffect(() => {
    (async () => {
      const cocktailsData: CocktailData[] = await fetch(
        `/api/cocktails?s=${debouncedSearchVal}`
      ).then((res) => res.json());
      setCocktails(cocktailsData);
    })();
  }, [debouncedSearchVal]);

  return (
    <>
      <input
        onInput={handleSearchInput}
        placeholder='Search cocktail'
        value={searchInputVal}
      />
      <CocktailsList cocktailsData={cocktails}></CocktailsList>
    </>
  );
}
