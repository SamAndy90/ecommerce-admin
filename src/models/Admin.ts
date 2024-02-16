import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

export type AdminType = {
  email: string;
  password: string;
  name?: string;
  image?: string;
};

export function hashPassword(str: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
}

const adminSchema = new Schema<AdminType>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    name: String,
    image: String,
  },
  { timestamps: true }
);

adminSchema.post("validate", (user) => {
  user.password = hashPassword(user.password);
});

export default models.Admin || model("Admin", adminSchema);
