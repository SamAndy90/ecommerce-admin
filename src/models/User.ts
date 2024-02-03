import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

export type UserType = {
  email: string;
  password: string;
  name: string;
  lastName: string;
};

export function hashPassword(str: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
}

const userSchema = new Schema<UserType>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    lastName: String,
  },
  { timestamps: true }
);

userSchema.post("validate", (user) => {
  user.password = hashPassword(user.password);
});

export default models.User || model("User", userSchema);
