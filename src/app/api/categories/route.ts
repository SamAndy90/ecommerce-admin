import { dbConnect } from "lib/db-connect";
import Category from "models/Category";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = id
    ? await Category.findOne({ _id: id }).populate("parent")
    : await Category.find().populate("parent");

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const category = await Category.create(body);

  return NextResponse.json(category);
}

export async function PUT(req: Request) {
  await dbConnect();
  const body = await req.json();
  await Category.updateOne({ _id: body._id }, body);

  return NextResponse.json("OK");
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await Category.deleteOne({ _id: id });

  return NextResponse.json("OK");
}
