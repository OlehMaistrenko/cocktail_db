import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import CocktailData from "@/types/CocktailData";
import { request } from "http";

export async function GET(request?: Request) {
  try {
    const session = await getServerSession(authOptions);
    const url = request ? new URL(request.url) : undefined;
    const string = url ? url.searchParams.get("s") : "";
    const data = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + string
    ).then((res) => res.json());
    let cocktailsData: CocktailData[] = data.drinks.map(
      (drink: { idDrink: string; strDrink: string; strDrinkThumb: string }) => {
        const cocktail: CocktailData = {
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
          ingredients: [],
        };
        return cocktail;
      }
    );
    if (session) {
      const client = await clientPromise;
      const database = client.db("cocktailDB");
      const users = database.collection("users");
      const favorites = database.collection("favorites");
      const user = await users.findOne({ email: session?.user?.email });
      const userFavorites = await favorites.findOne<{
        _id: string;
        favorites: CocktailData[];
      }>({ _id: user?._id });
      const favIds = userFavorites?.favorites.map((item) => item.id);
      cocktailsData = cocktailsData.map((cocktail) => {
        return {
          ...cocktail,
          isFavorite: favIds?.includes(cocktail.id),
        };
      });
    }

    return NextResponse.json(cocktailsData);
  } catch (err) {
    return NextResponse.json([]);
  }
}
