"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "common/Loader";
import { Button } from "common/ui";
import {
  CategoryType,
  deleteCategory,
  getCategories,
  getCategory,
} from "data-fetchers/categories";

type CategoriesListProps = {
  setCategoryForEdit: (data: CategoryType) => void;
  openEditForm: () => void;
};

export default function CategoriesList({
  setCategoryForEdit,
  openEditForm,
}: CategoriesListProps) {
  const client = useQueryClient();

  const {
    data: categories,
    isLoading,
    isSuccess,
  } = useQuery<CategoryType[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const removeCategory = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return (
    <div
      className={
        "flex flex-col border border-blue-900 divide-y divide-blue-900 rounded-lg overflow-hidden"
      }
    >
      <div className={"px-2 py-3 flex bg-blue-100 font-semibold text-xl"}>
        <div className={"basis-48"}>Categories</div>
        <div className={"flex-1 border-l border-blue-900 px-2"}>Parent</div>
      </div>
      {isLoading && <Loader />}
      {isSuccess &&
        categories.map((category) => {
          return (
            <div className={"flex items-center px-2 py-1"} key={category._id}>
              <div className={"basis-48"}>{category.categoryName}</div>
              <div className={"flex-1 border-l border-blue-900 px-2"}>
                {category.parent ? category.parent?.categoryName : ""}
              </div>
              <div className={"flex gap-1"}>
                <Button
                  onClick={() => {
                    setCategoryForEdit(category);
                    openEditForm();
                  }}
                  size={"small"}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => removeCategory.mutate(category._id)}
                  size={"small"}
                  colorVariant={"danger"}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
