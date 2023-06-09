import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import clientPromise from "@/lib/mongodb";
import { UpdateResult, InsertOneResult } from 'mongodb';



export async function POST(request: Request) {
  try {
    const item = await request.json();
    const session = await getServerSession(authOptions)
    const client = await clientPromise;
    const database = client.db('cocktailDB');
    const users = database.collection('users');
    const favorites = database.collection('favorites');
    const user = await users.findOne({ email: session?.user?.email });
    const userFavorites = await favorites.findOne({ _id: user?._id })
    let res:UpdateResult|InsertOneResult;
    if (userFavorites) {
      res = await favorites.updateOne({ _id: user?._id }, { $addToSet: { "favorites": item } });
    } else {
      res = await favorites.insertOne({ _id: user?._id, favorites: [item] })
    }
    if (res.acknowledged)
    return NextResponse.json(res.acknowledged)

  } catch (err) {
    return NextResponse.json(err)
  }
}
