import CocktailsList from "@/components/cocktail/CocktailsList";
import CocktailData from "@/types/CocktailData";
import { GET } from "@/app/api/favorites/route";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/favorites`);
  }
  const cocktailsData: CocktailData[] = await GET().then((res) => res.json());
  return <CocktailsList cocktailsData={cocktailsData}></CocktailsList>;
}
