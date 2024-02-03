import { FormProperty } from "data-fetchers/categories";
import { mongoConnect } from "lib/mongo-connect";
import Category from "models/Category";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongoConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = id
    ? await Category.findOne({ _id: id }).populate("parent")
    : await Category.find().populate("parent");
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await mongoConnect();
  let body = await req.json();

  if (body.parent === "") {
    const { parent, ...rest } = body;
    body = rest;
  }

  if (body.properties?.length) {
    const properties = body.properties.map((prop: FormProperty) => {
      const valuesArray = prop.values.split(",").map((v: string) => v.trim());
      return { ...prop, values: valuesArray };
    });
    body = { ...body, properties };
  }

  const category = await Category.create(body);
  return NextResponse.json(category);
}

export async function PUT(req: Request) {
  await mongoConnect();
  let body = await req.json();

  if (body.parent === "") {
    const { parent, ...rest } = body;
    body = rest;
  }

  if (body.properties?.length) {
    const properties = body.properties.map((prop: FormProperty) => {
      const valuesArray = prop.values.split(",").map((v: string) => v.trim());
      return { ...prop, values: valuesArray };
    });
    body = { ...body, properties };
  }

  await Category.updateOne({ _id: body._id }, body);
  return NextResponse.json("OK");
}

export async function DELETE(req: Request) {
  await mongoConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await Category.deleteOne({ _id: id });
  return NextResponse.json("OK");
}
