import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");
  if (userId) {
    try {
      const client = await clientPromise;
      const database = client.db("cocktailDB");
      const favorites = database.collection("favorites");
      const userFavorites = await favorites.findOne<{
        _id: string;
        favorites: any;
      }>({ _id: new ObjectId(userId) });
      console.log(userFavorites?.favorites);

      return NextResponse.json(userFavorites?.favorites);
    } catch (err) {
      return NextResponse.json(err);
    }
  } else {
    return NextResponse.json([]);
  }
}
