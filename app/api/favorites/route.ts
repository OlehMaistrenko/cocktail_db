import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import clientPromise from "@/lib/mongodb";


export async function GET() {
  try {
    const session =  await getServerSession(authOptions)
    const client = await clientPromise;
    const database = client.db('cocktailDB');
    const users = database.collection('users');
    const favorites = database.collection('favorites');
    const user = await users.findOne({ email: session?.user?.email });
    const userFavorites = await favorites.findOne<{_id:string, favorites: any}>({ _id: user?._id })
    return NextResponse.json(userFavorites?.favorites)
  } catch (err) {
    return NextResponse.json(err)
  }
}
