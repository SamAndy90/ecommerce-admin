import { Schema, model, models } from "mongoose";

export type ProductDB = {
  title: string;
  category?: string;
  description?: string;
  price: number;
  images?: Array<string>;
  properties?: Record<string, string>;
};

const ProductSchema = new Schema<ProductDB>(
  {
    title: { type: String, require: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    description: String,
    price: { type: Number, require: true },
    images: Array(String),
    properties: Object,
  },
  { timestamps: true }
);

export default models.Product || model("Product", ProductSchema);
