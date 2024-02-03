import { mongoConnect } from "lib/mongo-connect";
import Order from "models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoConnect();
  const orders = await Order.find().sort({ updatedAt: -1 });

  return NextResponse.json(orders);
}
