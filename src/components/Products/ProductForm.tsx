"use client";

import { Button } from "common/ui";
import {
  FormTextInput,
  FormSelectInput,
  FormNumberInput,
} from "common/FormInputs";
import {
  ProductType,
  createProduct,
  editProduct,
} from "data-fetchers/products";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { FiUpload } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaults } from "utils/zod";
import { UploadButton } from "utils/uploadthing";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryType, getCategories } from "data-fetchers/categories";

const productSchema = z.object({
  title: z.string().min(1, "Title is Required").default(""),
  description: z.string().default(""),
  price: z.number().gt(0).default(0),
  category: z.string().optional(),
  properties: z.record(z.string()).default({}),
});

type Form = z.infer<typeof productSchema>;

type ProductFormProps = {
  product?: ProductType;
};

export default function ProductForm({ product }: ProductFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const client = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (product?.images?.length) setImages(product.images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const create = useMutation({
    mutationKey: ["product"],
    mutationFn: createProduct,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const update = useMutation({
    mutationKey: ["product", product?._id],
    mutationFn: editProduct,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const form = useForm<Form>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? productSchema.parse({
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          properties: product.properties,
        })
      : getDefaults(productSchema),
  });

  let selectedCategory = useWatch({ control: form.control, name: "category" });
  let allPropsForProduct = [];

  if (categories?.length && selectedCategory) {
    let category = categories.find((cat) => cat._id === selectedCategory)!;

    if (category.properties?.length) {
      allPropsForProduct.push(...category.properties);
    }

    while (category.parent?._id) {
      const parentCat = categories?.find(
        (cat) => cat._id === category?.parent?._id
      ) as CategoryType;

      if (parentCat?.properties?.length) {
        allPropsForProduct.push(...parentCat.properties);
      }
      category = parentCat;
    }
  }

  const onSubmit = (data: Form) => {
    if (product) {
      const updatedData = { ...data, id: product._id, images: images };
      update.mutate(updatedData);
    } else {
      const dataWithImages = { ...data, images: images };
      create.mutate(dataWithImages);
    }
    form.reset(getDefaults(productSchema));
    router.replace("/products");
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType={"multipart/form-data"}
      >
        <div className={"flex flex-col gap-3 mb-10"}>
          <div className={"flex flex-col sm:flex-row gap-2"}>
            <FormTextInput
              className={{ container: "flex-1" }}
              fieldName={"title"}
              label={"Product name"}
              placeholder={"Product name"}
            />
            <FormSelectInput
              fieldName={"category"}
              options={
                categories?.map((c) => ({
                  label: c.categoryName,
                  value: c._id,
                })) || []
              }
              label={"Select category"}
            />
          </div>
          <div>
            <h4 className={"font-medium"}>Properties</h4>
            <div>
              {allPropsForProduct.map((prop) => {
                return (
                  <div key={prop._id}>
                    <div>{prop.property}</div>
                    <FormSelectInput
                      fieldName={`properties.${prop.property}`}
                      options={prop.values.map((v) => {
                        return { value: v, label: v };
                      })}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className={"font-medium mb-2"}>Images</h2>
            <div className={"flex flex-wrap gap-2 justify-start"}>
              {!!images.length &&
                images.map((image, i) => {
                  return (
                    <div
                      key={image}
                      className={
                        "relative h-28 w-28 rounded-md overflow-hidden"
                      }
                    >
                      <Image
                        className={"object-cover"}
                        fill
                        src={image}
                        alt={`Product photo ${i + 1}`}
                      />
                    </div>
                  );
                })}
              <UploadButton
                content={{
                  button({ ready, isUploading, uploadProgress }) {
                    if (!ready) return <div>Wait please...</div>;
                    if (isUploading)
                      return (
                        <div className={"relative text-center z-40"}>
                          Loading {uploadProgress}%
                        </div>
                      );
                    return (
                      <>
                        <FiUpload className="mr-2" />
                        {"Upload"}
                      </>
                    );
                  },
                }}
                appearance={{
                  container: "flex h-28 basis-28",
                  button:
                    "h-full w-full focus-within:ring-transparent focus-within:bg-blue-800 focus-within:ring-offset-transparent hover:bg-blue-500 transition-colors",
                  allowedContent: "hidden",
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  const links = res.map((file) => {
                    return file.url;
                  });
                  setImages((prev) => [...prev, ...links]);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  console.log(`ERROR! ${error.message}`);
                }}
              />
            </div>
          </div>
          <FormTextInput
            fieldName={"description"}
            label={"Description"}
            multiline={true}
            placeholder={"Description"}
          />
          <FormNumberInput
            fieldName={"price"}
            label={"Price (in USD)"}
            placeholder={"Price"}
          />
        </div>
        <Button loading={create.isPending || update.isPending} type={"submit"}>
          Save
        </Button>
      </form>
    </FormProvider>
  );
}

// export const UPLOAD_FILE_DROPZONE_INPUT_DEFAULT_SCHEMA = z
//   .array(
//     z.object({
//       status: z.enum(["pending", "error", "loaded"]).default("loaded"),
//       previewImageUrl: z.string().default(""),
//       fileId: z.union([z.number(), z.string()]).optional().default(""),
//     })
//   )
//   .refine((i) => {
//     return i.every((j) => j.status === "loaded");
//   }, "Будь ласка, дочекайтеся завантаження файлів")
//   .default([]);
