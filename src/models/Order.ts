import { Schema, model, models } from "mongoose";

export type LineItem = {
  quantity: number;
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
    };
  };
};

export type OrderDB = {
  _id?: string;
  cart_items: LineItem[];
  fullname: string;
  email: string;
  country: string;
  city: string;
  postalcode: string;
  street: string;
  paid: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

const OrrderSchema = new Schema<OrderDB>(
  {
    cart_items: [Object],
    fullname: String,
    email: String,
    country: String,
    city: String,
    postalcode: String,
    street: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export default models.Order || model("Order", OrrderSchema);
