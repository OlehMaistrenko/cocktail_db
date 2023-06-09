import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { UpdateResult } from "mongodb";

export async function POST(request: Request) {
  try {
    const item = await request.json();
    const session = await getServerSession(authOptions);
    const client = await clientPromise;
    const database = client.db("cocktailDB");
    const users = database.collection("users");
    const favorites = database.collection("favorites");
    const user = await users.findOne({ email: session?.user?.email });
    const res: UpdateResult = await favorites.updateOne(
      { _id: user?._id },
      { $pull: { favorites: { id: item.id } } }
    );

    return NextResponse.json(res.acknowledged);
  } catch (err) {
    return NextResponse.json(err);
  }
}
