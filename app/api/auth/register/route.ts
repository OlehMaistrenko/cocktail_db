import { getErrorResponse } from "@/lib/helpers";
import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterUserInput;
    const data = RegisterUserSchema.parse(body);

    const hashedPassword = await hash(data.password, 12);
    const user = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };
    const client = await clientPromise;
    const database = client.db("cocktailDB");
    const users = database.collection("users");
    const res = await users.updateOne(
      { email: data.email },
      { $set: user },
      {
        upsert: true,
      }
    );
    if (res.matchedCount) {
      throw "user exist";
    }

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { user },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    if (error === "user exist") {
      return getErrorResponse(409, "user with that email already exists");
    }

    return getErrorResponse(500, error.message);
  }
}
