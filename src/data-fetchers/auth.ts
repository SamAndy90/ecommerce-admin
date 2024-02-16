import axios from "axios";
import { AdminType } from "models/Admin";

export async function createAdmin(data: AdminType) {
  return await axios.post("/api/admin", data);
}

export async function updateAdminInfo(data: Omit<AdminType, "password">) {
  return await axios.put("/api/admin", data);
}
