import axios from "axios";

export type ProductType = {
  _id?: string;
  title: string;
  description: string;
  price: number;
  images?: string[];
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

export const createProduct = async (data: ProductType) => {
  return await axios.post<ProductType>("/api/products", data);
};

export const editProduct = async (data: ProductType) => {
  return await axios.put<ProductType>("/api/products", data);
};

export const deleteProduct = async (id: string) => {
  return await axios
    .delete<ProductType>("/api/products?id=" + id)
    .then((data) => data.data);
};
