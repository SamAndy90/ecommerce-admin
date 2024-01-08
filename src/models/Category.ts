import { Schema, model, models } from "mongoose";

type CategoryDB = {
  categoryName: string;
  parent?: string;
};

const categorySchema = new Schema<CategoryDB>({
  categoryName: { type: String, required: true },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export default models.Category || model("Category", categorySchema);
