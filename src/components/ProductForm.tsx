"use client";

import { Button, TextInput } from "common/ui";
import {
  ProductType,
  createProduct,
  editProduct,
} from "data-fetchers/products";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FiUpload } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaults } from "utils/zod";
import { UploadButton } from "utils/uploadthing";
import Image from "next/image";

const productSchema = z.object({
  title: z.string().min(1, "Title is Required").default(""),
  description: z.string().default(""),
  price: z.number().gt(0).default(0),
});

type ProductFormType = z.infer<typeof productSchema>;

type ProductFormProps = {
  product?: ProductType;
};

export default function ProductForm({ product }: ProductFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (product) {
      // setValue("title", product.title);
      // setValue("description", product.description);
      // setValue("price", product.price);
      if (product.images?.length) setImages(product.images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, images]);

  const form = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? productSchema.parse({
          title: product.title,
          description: product.description,
          price: product.price,
        })
      : getDefaults(productSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { isLoading, errors },
    reset,
    setValue,
  } = form;

  const onSubmit = (data: ProductFormType) => {
    if (product) {
      const updatedData = { ...data, id: product._id, images: images };
      editProduct(updatedData);
    } else {
      const dataWithImages = { ...data, images: images };
      createProduct(dataWithImages);
    }
    router.replace("/products");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType={"multipart/form-data"}>
      <div className={"flex flex-col gap-3 mb-10"}>
        <TextInput
          {...register("title")}
          label={"Product name"}
          placeholder={"Product name"}
          helperText={errors.title?.message}
        />
        <div>
          <h2 className={"font-medium mb-2"}>Images</h2>
          <div className={"flex flex-wrap, gap-2 justify-start"}>
            {!!images.length &&
              images.map((image, i) => {
                return (
                  <div
                    key={image}
                    className={"relative h-28 w-28 rounded-md overflow-hidden"}
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
                      <div className={"relative text-center z-50"}>
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
                setImages(links);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                console.log(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </div>
        <TextInput
          {...register("description")}
          label={"Description"}
          multiline={true}
          placeholder={"Description"}
          helperText={errors.description?.message}
        />
        <TextInput
          type={"number"}
          {...register("price", {
            valueAsNumber: true,
          })}
          label={"Price (in USD)"}
          placeholder={"Price"}
          helperText={errors.price?.message}
        />
      </div>
      <Button loading={isLoading} type={"submit"}>
        Save
      </Button>
    </form>
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
