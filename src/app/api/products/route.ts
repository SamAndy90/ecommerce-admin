import { mongoConnect } from "lib/mongo-connect";
import Product from "models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongoConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const products = id
    ? await Product.findOne({ _id: id })
    : await Product.find();

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await mongoConnect();

  const body = await req.json();
  const product = await Product.create(body);

  return NextResponse.json(product);
}

export async function PUT(req: Request) {
  await mongoConnect();

  const body = await req.json();
  await Product.updateOne({ _id: body.id }, { ...body });

  return NextResponse.json(true);
}

export async function DELETE(req: Request) {
  await mongoConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await Product.deleteOne({ _id: id });

  return NextResponse.json(true);
}
