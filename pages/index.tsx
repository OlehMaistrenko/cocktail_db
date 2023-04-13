import Head from "next/head";
import styles from "@/styles/Home.module.css";
import CocktailsList from "@/components/CocktailsList";
import { useState } from "react";
import { CocktailData } from "@/types/CocktailData";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import getCocktails from "@/api/getCocktails";

export default function Home({
  cocktailsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [cocktails, setCocktails] = useState(cocktailsData);
  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cocktailsData = await getCocktails(e.target.value);
    setCocktails(cocktailsData);
  };

  return (
    <>
      <Head>
        <title>Cocktais DB</title>
      </Head>
      <main className={styles.main}>
        <input onInput={handleSearchInput} placeholder='Search cocktail' />
        <CocktailsList cocktailsData={cocktails}></CocktailsList>
      </main>
    </>
  );
}
export const getStaticProps: GetStaticProps<{
  cocktailsData: CocktailData[];
}> = async () => {
  const cocktailsData = await getCocktails();
  return {
    props: {
      cocktailsData,
    },
  };
};
