import axios from "axios";
import { OrderDB } from "models/Order";

export const getOrders = async () => {
  return await axios.get<OrderDB[]>("/api/orders").then((res) => res.data);
};
