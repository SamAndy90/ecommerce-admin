"use client";

import { Button, TextInput } from "common/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaults } from "utils/zod";
import {
  CategoryType,
  EditCategoryType,
  createCategory,
  editCategory,
  getCategories,
} from "data-fetchers/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SelectInput } from "common/ui/Inputs/SelectInput";
import { useState } from "react";

const categorySchema = z.object({
  categoryName: z.string().min(1, "Category is Required").default(""),
  parent: z.string().optional(), // TODO: default ?
});

type CategoryFormType = z.infer<typeof categorySchema>;

type CategoriesFormProps = {
  categoryEdit: CategoryType;
  onClose: () => void;
};

export default function EditCategoryForm({
  categoryEdit,
  onClose,
}: CategoriesFormProps) {
  const client = useQueryClient();

  const form = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: categorySchema.parse({
      categoryName: categoryEdit.categoryName,
      parent: categoryEdit.parent?._id,
    }),
  });

  const {
    handleSubmit,
    register,
    formState: { isLoading, errors },
    reset,
  } = form;

  const { data: categories, isSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const putCategory = useMutation({
    mutationFn: (data: EditCategoryType) => editCategory(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit = (data: CategoryFormType) => {
    putCategory.mutate({ ...data, _id: categoryEdit._id });
    reset(getDefaults(categorySchema));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className={"font-medium text-lg"}>Edit category</h3>
      <div className={"flex justify-between gap-2"}>
        <TextInput
          className={{ container: "flex-1" }}
          {...register("categoryName")}
          placeholder={"Category name"}
          helperText={errors.categoryName?.message}
        />
        <select
          className={"border border-gray-200 px-2 rounded-md outline-none"}
          {...register("parent")}
        >
          <option value={""}>–</option>
          {isSuccess &&
            categories.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category.categoryName}
              </option>
            ))}
        </select>
        <Button loading={isLoading} type={"submit"} size={"small"}>
          Save
        </Button>
      </div>
    </form>
  );
}
