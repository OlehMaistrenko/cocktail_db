import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { UpdateResult, InsertOneResult, ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");
  if (userId) {
    try {
      const item = await req.json();
      const client = await clientPromise;
      const database = client.db("cocktailDB");
      const favorites = database.collection("favorites");
      const userFavorites = await favorites.findOne({
        _id: new ObjectId(userId),
      });
      let res: UpdateResult | InsertOneResult;
      if (userFavorites) {
        res = await favorites.updateOne(
          { _id: new ObjectId(userId) },
          { $addToSet: { favorites: item } }
        );
      } else {
        res = await favorites.insertOne({
          _id: new ObjectId(userId),
          favorites: [item],
        });
      }
      if (res.acknowledged) return NextResponse.json(res.acknowledged);
    } catch (err) {
      return NextResponse.json(err);
    }
  }
}
