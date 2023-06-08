import getCocktail from "../api/getCoctail";
import CocktailData from "@/types/CocktailData";
import getCocktails from "../api/getCocktails";
import CocktailDetail from "@/components/cocktail/CocktailDetail";
export default async function Page({
  params,
}: {
  params: { cocktailId: string };
}) {
  const cocktailData = await getCocktail(params.cocktailId);
  return (
    <CocktailDetail cocktailData={cocktailData}></CocktailDetail>
  );
}

export async function generateStaticParams() {
  const cocktailsData = await getCocktails();
  return cocktailsData.map((drink: CocktailData) => ({ cocktailId: drink.id }));
}


export async function generateMetadata({ params }: { params: { cocktailId: string }; }) {
  const cocktailData = await getCocktail(params.cocktailId);
  return {
    title: cocktailData.name,
  }
};