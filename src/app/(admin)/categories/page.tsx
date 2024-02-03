"use client";

import { Title } from "common/Title";
import CategoriesList from "components/Categories/CategoriesList";
import ModalEditCategory from "components/Categories/ModalEditCategory";
import { CategoryType } from "data-fetchers/categories";
import { useState } from "react";
import CreateCategoryForm from "components/Categories/CreateCategoryForm";

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<CategoryType>();

  function getCategoryForEdit(data: CategoryType) {
    setCategory(data);
  }

  return (
    <>
      <div className={"flex flex-col gap-4"}>
        <Title>Categories</Title>
        <CreateCategoryForm />
        <div
          className={
            "px-1 py-3 flex bg-blue-100 font-semibold text-xl rounded-md border border-blue-900"
          }
        >
          <div className={"basis-40 lg:basis-52 px-3"}>Categories</div>
          <div
            className={"hidden sm:block flex-1 border-l border-blue-900 px-3"}
          >
            Parent
          </div>
        </div>
        <CategoriesList
          setCategoryForEdit={getCategoryForEdit}
          openEditForm={() => setIsModalOpen(true)}
        />
      </div>
      {category && (
        <ModalEditCategory
          data={category}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
