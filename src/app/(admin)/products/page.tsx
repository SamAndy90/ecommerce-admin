"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "common/Loader";
import { Title } from "common/Title";
import { LinkButton } from "common/ui/Buttons/LinkButton";
import ProductsList from "components/ProductsList";
import { getProducts } from "data-fetchers/products";
import Link from "next/link";

export default function ProductsPage() {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <div className={"flex flex-col gap-4"}>
      <Link href={"/products/new"}>
        <LinkButton>Add new product</LinkButton>
      </Link>
      <Title>Products</Title>
      {isLoading && <Loader />}
      {isSuccess && <ProductsList data={data} />}
    </div>
  );
}
