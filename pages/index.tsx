import Head from "next/head";
import styles from "@/styles/Home.module.css";
import CocktailsList from "@/components/CocktailsList";
import axios from "axios";
import { useState } from "react";
import { CocktailData } from "@/types/CocktailData";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import { z } from "zod";
import TextField from "@mui/material/TextField";

const searchCocktails = async (string: String = "") => {
  const dataSchema = z.array(
    z.object({
      idDrink: z.string(),
      strDrink: z.string(),
      strDrinkThumb: z.string(),
    })
  );
  const result = await axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + string
  );
  try {
    const data = dataSchema.parse(result.data.drinks);
    const cocktailsData = data.map((drink) => {
      const cocktail: CocktailData = {
        id: drink.idDrink,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      };
      return cocktail;
    });
    return cocktailsData;
  } catch (err) {
    return [
      {
        id: "",
        name: "",
        image: "",
      },
    ];
  }
};

export default function Home({
  cocktailsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [cocktails, setCocktails] = useState(cocktailsData);
  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cocktailsData = await searchCocktails(e.target.value);
    setCocktails(cocktailsData);
  };

  return (
    <>
      <Head>
        <title>Cocktais DB</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <TextField onInput={handleSearchInput} />
        <CocktailsList cocktailsData={cocktails}></CocktailsList>
      </main>
    </>
  );
}
export const getStaticProps: GetStaticProps<{
  cocktailsData: CocktailData[];
}> = async () => {
  const cocktailsData = await searchCocktails();
  return {
    props: {
      cocktailsData,
    },
  };
};
