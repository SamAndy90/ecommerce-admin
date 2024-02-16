import { mongoConnect } from "lib/mongo-connect";
import Admin from "models/Admin";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await mongoConnect();
  const data = await req.json();
  try {
    const admin = await Admin.create(data);
    return NextResponse.json(admin);
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "This email is already registered. Try another email" },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: err.message });
  }
}

export async function PUT(req: NextRequest) {
  await mongoConnect();
  const data = await req.json();

  const admin = await Admin.updateOne({ email: data.email }, data);
  return NextResponse.json(admin);
}
