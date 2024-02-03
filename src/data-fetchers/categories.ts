import axios from "axios";
import { PropertyDB } from "models/Category";

type ParentType = {
  _id: string;
  categoryName: string;
};

export type FormProperty = {
  property: string;
  values: string;
};

export type CategoryType = {
  _id: string;
  categoryName: string;
  parent?: ParentType;
  properties?: PropertyDB[];
};

export type EditCategoryType = {
  _id: string;
  categoryName: string;
  parent?: string;
  properties?: FormProperty[];
};

export const getCategories = async () => {
  return await axios
    .get<CategoryType[]>("/api/categories")
    .then((data) => data.data);
};

export const getCategory = async (id: string) => {
  return await axios
    .get<CategoryType>("/api/categories?id=" + id)
    .then((data) => data.data);
};

export const createCategory = async (data: Omit<EditCategoryType, "_id">) => {
  return await axios.post<Omit<EditCategoryType, "_id">>(
    "/api/categories",
    data
  );
};

export const editCategory = async (data: EditCategoryType) => {
  return await axios.put<EditCategoryType>("/api/categories", data);
};

export const deleteCategory = async (id: string) => {
  return await axios
    .delete<CategoryType>("/api/categories?id=" + id)
    .then((data) => data.data);
};
