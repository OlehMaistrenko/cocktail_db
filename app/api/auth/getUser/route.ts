import { getErrorResponse } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access"
    );
  }

  var o_id = new ObjectId(userId);
  const client = await clientPromise;
  const database = client.db("cocktailDB");
  const users = database.collection("users");
  const user = await users.findOne({ _id: o_id });

  return NextResponse.json({
    status: "success",
    data: { user: { ...user, password: undefined } },
  });
}
