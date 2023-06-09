import Home from "./Home";
import { GET } from "@/app/api/cocktails/route";

export default async function Page() {
  const cocktailsData = await GET().then((res) => res.json());
  return <Home cocktailsData={cocktailsData} />;
}
