import { mongoConnect } from "lib/mongo-connect";
import User from "models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await mongoConnect();
  const user = await req.json();
  const isUserExist = await User.findOne({ email: user.email });
  if (isUserExist) {
    return new NextResponse("User already exist blalala", { status: 400 });
  }
  const newUser = await User.create(user);

  return NextResponse.json(newUser);
}
