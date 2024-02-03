import axios from "axios";
import { UserType } from "models/User";

export async function createUser(user: UserType) {
  return await axios.post("/api/register", user);
}
