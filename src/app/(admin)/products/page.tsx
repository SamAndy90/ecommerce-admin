"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "common/Loader";
import { Title } from "common/Title";
import { LinkButton } from "common/ui/Buttons/LinkButton";
import ProductsList from "components/Products/ProductsList";
import { getProducts } from "data-fetchers/products";
import Link from "next/link";

export default function ProductsPage() {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <div className={"flex flex-col gap-4"}>
      <Title>Products</Title>
      <Link className={"self-start"} href={"/products/new"}>
        <LinkButton>Add new product</LinkButton>
      </Link>

      <div
        className={
          "flex px-1 font-semibold text-lg sm:text-xl bg-blue-100 divide-x divide-blue-900 py-3 rounded-md border border-blue-900"
        }
      >
        <div className={"sm:basis-44 md:basis-48 lg:basis-52 px-3"}>Name</div>
        <div className={"flex-1 px-3 hidden sm:block"}>Description</div>
      </div>
      {isLoading && <Loader />}
      {isSuccess && <ProductsList data={data} />}
    </div>
  );
}
