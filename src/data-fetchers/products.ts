import axios from "axios";
import { ProductDB } from "models/Product";

export type ProductType = {
  _id?: string;
  title: string;
  category?: string;
  description: string;
  price: number;
  images?: string[];
  properties?: Record<string, string>;
};

export const getProducts = async () => {
  return await axios
    .get<ProductType[]>("/api/products")
    .then((data) => data.data);
};

export const getProduct = async (id: string) => {
  return await axios
    .get<ProductType>("/api/products?id=" + id)
    .then((data) => data.data);
};

export const createProduct = async (data: ProductDB) => {
  return await axios.post<ProductDB>("/api/products", data);
};

export const editProduct = async (data: ProductType) => {
  return await axios.put<ProductType>("/api/products", data);
};

export const deleteProduct = async (id: string) => {
  return await axios
    .delete<ProductType>("/api/products?id=" + id)
    .then((data) => data.data);
};
