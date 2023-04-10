import Head from "next/head";
import styles from "@/styles/Cocktail.module.css";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { InferGetStaticPropsType } from "next";
import { CocktailData } from "@/types/CocktailData";
import CocktailDetail from "@/components/CocktailDetail";

export default function Cocktail({
  cocktailData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{cocktailData.name}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
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
  const paths = [
    {
      params: {
        cocktailId: "1",
      },
    },
  ];

  return { paths, fallback: "blocking" };
};
export const getStaticProps: GetStaticProps<{
  cocktailData: CocktailData;
}> = async ({ params }) => {
  const cocktailId = params?.cocktailId;

  let data: CocktailData;
  const result = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
  );

  data = {
    id: result.data.drinks[0].idDrink,
    name: result.data.drinks[0].strDrink,
    image: result.data.drinks[0].strDrinkThumb,
  };

  for (let i = 1; i < 16; i++) {
    if (result.data.drinks[0]["strIngredient" + i] !== null) {
      if (data.ingredients) {
        data.ingredients.push({
          name: result.data.drinks[0]["strIngredient" + i],
          amount: result.data.drinks[0]["strMeasure" + i],
        });
      } else {
        data.ingredients = [
          {
            name: result.data.drinks[0]["strIngredient" + i],
            amount: result.data.drinks[0]["strMeasure" + i],
          },
        ];
      }
    }
  }

  return {
    props: {
      cocktailData: data,
    },
  };
};
