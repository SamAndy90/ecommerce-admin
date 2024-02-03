"use client";

import { Button } from "common/ui";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaults } from "utils/zod";
import {
  CategoryType,
  editCategory,
  getCategories,
} from "data-fetchers/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormSelectInput, FormTextInput } from "common/FormInputs";

const categorySchema = z.object({
  categoryName: z.string().min(1, "Category is Required").default(""),
  parent: z.string().optional(),
  properties: z
    .array(
      z.object({
        property: z
          .string()
          .min(1, "Property must be at least 1 character")
          .default(""),
        values: z
          .string()
          .min(1, "Value must be at least 1 character")
          .default(""),
      })
    )
    .optional(),
});

type Form = z.infer<typeof categorySchema>;

type CategoriesFormProps = {
  categoryEdit: CategoryType;
  onClose: () => void;
};

export default function EditCategoryForm({
  categoryEdit,
  onClose,
}: CategoriesFormProps) {
  const client = useQueryClient();

  const form = useForm<Form>({
    resolver: zodResolver(categorySchema),
    defaultValues: categorySchema.parse({
      categoryName: categoryEdit.categoryName,
      parent: categoryEdit.parent?._id,
      properties: categoryEdit.properties?.map((property) => {
        return { ...property, values: property.values.join(", ") };
      }),
    }),
  });

  const { fields, remove, append } = useFieldArray({
    name: "properties",
    control: form.control,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const update = useMutation({
    mutationFn: editCategory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit = (data: Form) => {
    update.mutate({ ...data, _id: categoryEdit._id });
    form.reset(getDefaults(categorySchema));
    onClose();
  };

  return (
    <FormProvider {...form}>
      <form className={"relative z-50"} onSubmit={form.handleSubmit(onSubmit)}>
        <h3 className={"font-semibold text-lg sm:text-xl"}>Edit category</h3>
        <div className={"flex flex-col justify-between gap-4"}>
          <div className={"flex flex-col sm:flex-row gap-2"}>
            <FormTextInput
              className={{ container: "flex-1", label: "text-blue-900" }}
              label={"Category Name"}
              fieldName={"categoryName"}
              placeholder={"Category name"}
            />
            <FormSelectInput
              label={"Parent"}
              fieldName={"parent"}
              options={
                categories?.map((c) => ({
                  value: c._id,
                  label: c.categoryName,
                })) || []
              }
            />
          </div>
          <div className={"flex flex-col gap-2"}>
            <Button
              onClick={() => append({ property: "", values: "" })}
              className={{ button: "self-start" }}
              size={"small"}
            >
              Add property
            </Button>
            <div className={"flex flex-col gap-y-2 sm:gap-y-1"}>
              {fields.map((property, i) => {
                return (
                  <div
                    className={"flex flex-col sm:flex-row gap-y-1 gap-x-2"}
                    key={property.id}
                  >
                    <FormTextInput
                      className={{ input: "py-1.5", container: "flex-1" }}
                      fieldName={`properties.${i}.property`}
                      placeholder={"Category name"}
                    />
                    <FormTextInput
                      className={{ input: "py-1.5", container: "flex-1" }}
                      fieldName={`properties.${i}.values`}
                      placeholder={"Property values (v1, v2, etc...)"}
                    />
                    <Button
                      className={{
                        button: "self-start py-[9px] w-full xs:w-auto",
                      }}
                      onClick={() => remove(i)}
                      size={"small"}
                      colorVariant={"danger"}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            className={{ button: "self-start" }}
            loading={form.formState.isLoading}
            type={"submit"}
            size={"small"}
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
