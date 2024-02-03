"use client";

import { Button } from "common/ui";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaults } from "utils/zod";
import { createCategory, getCategories } from "data-fetchers/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormSelectInput, FormTextInput } from "common/FormInputs";

const categorySchema = z.object({
  categoryName: z.string().min(1, "Category is Required").default(""),
  parent: z.string().default(""),
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
    .default([]),
});

type Form = z.infer<typeof categorySchema>;

export default function CreateCategoryForm() {
  const client = useQueryClient();

  const form = useForm<Form>({
    resolver: zodResolver(categorySchema),
    defaultValues: getDefaults(categorySchema),
  });

  const { fields, remove, append } = useFieldArray({
    name: "properties",
    control: form.control,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const create = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit = (data: Form) => {
    create.mutate(data);
    form.reset(getDefaults(categorySchema));
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={"flex flex-col justify-between gap-4"}>
          <div className={"flex flex-col sm:flex-row gap-2"}>
            <FormTextInput
              className={{ container: "flex-1" }}
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
            <div className={"flex flex-col gap-1"}>
              {fields.map((property, i) => {
                return (
                  <div
                    className={"flex flex-col sm:flex-row gap-2"}
                    key={property.id}
                  >
                    <FormTextInput
                      className={{ input: "py-1.5", container: "flex-1" }}
                      fieldName={`properties.${i}.property`}
                      placeholder={"Property name"}
                    />
                    <FormTextInput
                      className={{ input: "py-1.5", container: "flex-1" }}
                      fieldName={`properties.${i}.values`}
                      placeholder={"Property values (v1, v2, etc...)"}
                    />
                    <Button
                      className={{
                        button: "self-start py-[9px] w-full sm:w-auto",
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
            loading={create.isPending}
            type={"submit"}
            size={"small"}
          >
            Create
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
