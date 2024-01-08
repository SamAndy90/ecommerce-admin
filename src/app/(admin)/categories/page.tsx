"use client";

import { useQuery } from "@tanstack/react-query";
import { Title } from "common/Title";
import CategoriesForm from "components/CreateCategoryForm";
import CategoriesList from "components/CategoriesList";
import ModalEditCategory from "components/ModalEditCategory";
import { CategoryType } from "data-fetchers/categories";
import { useState } from "react";
import CreateCategoryForm from "components/CreateCategoryForm";

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<CategoryType>();

  function modalHandler(data: CategoryType) {
    setCategory(data);
  }

  return (
    <>
      <div className={"flex flex-col gap-4"}>
        <Title>Categories</Title>
        <CreateCategoryForm />
        <CategoriesList
          setCategoryForEdit={modalHandler}
          openEditForm={() => setIsModalOpen(true)}
        />
      </div>
      <ModalEditCategory
        data={category}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
