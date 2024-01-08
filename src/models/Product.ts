import { Schema, model, models } from "mongoose";

type ProductDB = {
  title: string;
  description?: string;
  price: number;
  images?: Array<string>;
};

const productSchema = new Schema<ProductDB>({
  title: { type: String, require: true },
  description: String,
  price: { type: Number, require: true },
  images: Array(String),
});

export default models.Product || model("Product", productSchema);
