import Home from "./Home";
import getCocktails from "@/app/api/getCocktails";

export default async function Page() {
  const cocktailsData = await getCocktails();
  return <Home cocktailsData={cocktailsData} />;
}
