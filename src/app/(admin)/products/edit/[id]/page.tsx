"use client";

import { useQuery } from "@tanstack/react-query";
import { Title } from "common/Title";
import ProductForm from "components/Products/ProductForm";
import { getProduct } from "data-fetchers/products";

type EditProductProps = {
  params: {
    id: string;
  };
};

export default function EditProduct({ params }: EditProductProps) {
  const { id } = params;
  const { data, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  return (
    <div>
      <Title>Edit Product</Title>
      {isSuccess && <ProductForm product={data} />}
    </div>
  );
}
