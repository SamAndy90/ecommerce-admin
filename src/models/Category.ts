import { Schema, model, models } from "mongoose";

export type PropertyDB = {
  _id?: string;
  property: string;
  values: string[];
};

export type CategoryDB = {
  categoryName: string;
  parent?: string;
  properties?: PropertyDB[];
};

const PropertySchema = new Schema<PropertyDB>({
  property: String,
  values: [String],
});

const CategorySchema = new Schema<CategoryDB>(
  {
    categoryName: { type: String, required: true, unique: true },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    properties: [PropertySchema],
  },
  { timestamps: true }
);

export default models.Category || model("Category", CategorySchema);
