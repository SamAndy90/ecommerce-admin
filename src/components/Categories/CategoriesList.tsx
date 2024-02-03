"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "common/Loader";
import { Button } from "common/ui";
import {
  CategoryType,
  deleteCategory,
  getCategories,
} from "data-fetchers/categories";
import { useState } from "react";
import ModalDeleteCategory from "./ModalDeleteCategory";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

type CategoriesListProps = {
  setCategoryForEdit: (data: CategoryType) => void;
  openEditForm: () => void;
};

export default function CategoriesList({
  setCategoryForEdit,
  openEditForm,
}: CategoriesListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string>("");
  categoryToDelete;
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
    <>
      <div className={"flex flex-col gap-y-2 overflow-y-scroll max-h-screen"}>
        {isLoading && <Loader />}
        {isSuccess &&
          categories.map((category) => {
            return (
              <div
                key={category._id}
                className={
                  "flex items-center p-1 rounded-md border border-blue-900"
                }
              >
                <div className={"flex-1 flex divide-x divide-blue-900"}>
                  <div className={"basis-40 lg:basis-52 px-3"}>
                    {category.categoryName}
                  </div>
                  {category.parent && (
                    <div className={"hidden sm:block flex-1 px-3"}>
                      {category.parent?.categoryName}
                    </div>
                  )}
                </div>
                <div className={"flex flex-col xs:flex-row gap-y-1 gap-x-2"}>
                  <Button
                    className={{ button: "flex gap-1 items-center" }}
                    onClick={() => {
                      setCategoryForEdit(category);
                      openEditForm();
                    }}
                    size={"small"}
                  >
                    <FiEdit />
                    Edit
                  </Button>
                  <Button
                    className={{ button: "flex gap-1 items-center" }}
                    onClick={() => {
                      setCategoryToDelete(category._id);
                      setIsOpen(true);
                    }}
                    size={"small"}
                    colorVariant={"danger"}
                  >
                    <IoTrashOutline />
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
      <ModalDeleteCategory
        open={isOpen}
        onClose={() => {
          setCategoryToDelete("");
          setIsOpen(false);
        }}
        onDelete={() => {
          removeCategory.mutate(categoryToDelete);
          setCategoryToDelete("");
          setIsOpen(false);
        }}
      />
    </>
  );
}
