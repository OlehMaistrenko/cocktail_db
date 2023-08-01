import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import CocktailData from "@/types/CocktailData";
import { request } from "http";
import { ObjectId } from "mongodb";
export const dynamic = "force-dynamic";
export async function GET(request?: NextRequest) {
  try {
    const userId = request?.headers.get("X-USER-ID");

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
    if (userId) {
      const client = await clientPromise;
      const database = client.db("cocktailDB");
      const favorites = database.collection("favorites");
      const userFavorites = await favorites.findOne<{
        _id: string;
        favorites: CocktailData[];
      }>({ _id: new ObjectId(userId) });
      const favIds = userFavorites?.favorites.map((item) => item.id);
      console.log(favIds);

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
