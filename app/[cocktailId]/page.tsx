import getCocktail from "../api/getCoctail";
import CocktailData from "@/types/CocktailData";
import getCocktails from "../api/getCocktails";
import CocktailDetail from "@/components/CocktailDetail";
export default async function Page({
  params,
}: {
  params: { cocktailId: string };
}) {
  const cocktailData = await getCocktail(params.cocktailId);
  return (
    <main>
      <CocktailDetail cocktailData={cocktailData}></CocktailDetail>
    </main>
  );
}

export async function generateStaticParams() {
  const cocktailsData = await getCocktails();
  return cocktailsData.map((drink: CocktailData) => ({ cocktailId: drink.id }));
}
