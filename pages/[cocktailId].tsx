import Head from "next/head";
import styles from "@/styles/Cocktail.module.css";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { InferGetStaticPropsType } from "next";
import { CocktailData } from "@/types/CocktailData";
import CocktailDetail from "@/components/CocktailDetail";
import getCocktails from "@/api/getCocktails";
import getCocktail from "@/api/getCoctail";

export default function Cocktail({
  cocktailData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{cocktailData.name}</title>
      </Head>
      <main className={styles.main}>
        <CocktailDetail cocktailData={cocktailData}></CocktailDetail>
      </main>
    </>
  );
}
export const getStaticPaths: GetStaticPaths<{
  cocktailId: string;
}> = async () => {
  const cocktailsData = await getCocktails();
  const paths = cocktailsData.map((drink: CocktailData) => {
    return {
      params: {
        cocktailId: drink.id,
      },
    };
  });
  console.log(paths);

  return { paths, fallback: "blocking" };
};
export const getStaticProps: GetStaticProps<{
  cocktailData: CocktailData;
}> = async ({ params }) => {
  const cocktailId = params?.cocktailId;

  const data = await getCocktail(cocktailId);

  return {
    props: {
      cocktailData: data,
    },
  };
};
