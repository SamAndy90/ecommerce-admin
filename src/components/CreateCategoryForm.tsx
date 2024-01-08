"use client";

import { Button, TextInput } from "common/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaults } from "utils/zod";
import { createCategory, getCategories } from "data-fetchers/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const categorySchema = z.object({
  categoryName: z.string().min(1, "Category is Required").default(""),
  parent: z.string().optional(), // TODO: default ?
});

type CategoryFormType = z.infer<typeof categorySchema>;

export default function CreateCategoryForm() {
  const client = useQueryClient();

  const form = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: getDefaults(categorySchema),
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

  const createNewCategory = useMutation({
    mutationFn: (data: CategoryFormType) => createCategory(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit = (data: CategoryFormType) => {
    if (data.parent === "") {
      createNewCategory.mutate({ categoryName: data.categoryName });
    } else {
      createNewCategory.mutate(data);
    }
    reset(getDefaults(categorySchema));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className={"font-medium text-lg"}>Create new category</h3>
      <div className={"flex justify-between gap-2"}>
        <TextInput
          className={{ container: "flex-1" }}
          {...register("categoryName")}
          placeholder={"Category name"}
          helperText={errors.categoryName?.message}
        />
        <select {...register("parent")}>
          <option value="">–</option>
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
