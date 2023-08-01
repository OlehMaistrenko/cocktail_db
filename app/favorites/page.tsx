import CocktailsList from "@/components/cocktail/CocktailsList";
import CocktailData from "@/types/CocktailData";
import { cookies } from "next/headers";
export default async function Page() {
  const cocktailsData: CocktailData[] = await fetch(
    `${process.env.API_ENDPOINT}/favorites`,
    {
      headers: { Cookie: cookies().toString() },
      cache: "no-store",
    }
  ).then((res) => res.json());
  return <CocktailsList cocktailsData={cocktailsData}></CocktailsList>;
}
