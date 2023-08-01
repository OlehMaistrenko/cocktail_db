import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { UpdateResult } from "mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");
  if (userId) {
    try {
      const item = await req.json();
      const client = await clientPromise;
      const database = client.db("cocktailDB");
      const favorites = database.collection("favorites");
      const res: UpdateResult = await favorites.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { favorites: { id: item.id } } }
      );

      return NextResponse.json(res.acknowledged);
    } catch (err) {
      return NextResponse.json(err);
    }
  }
}
