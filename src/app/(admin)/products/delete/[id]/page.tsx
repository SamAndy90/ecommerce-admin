"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Title } from "common/Title";
import { Button } from "common/ui";
import { LinkButton } from "common/ui/Buttons/LinkButton";
import { deleteProduct, getProduct } from "data-fetchers/products";
import { useRouter } from "next/navigation";

export default function DeletePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const { data, isSuccess } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProduct(id),
  });

  const delProduct = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => router.push("/products"),
  });

  return (
    <div>
      <Title className={"text-center mb-8"}>
        Do you realy want delete &quot;<span>{isSuccess && data.title}</span>
        &quot;
      </Title>
      <div className={"flex items-center justify-center gap-6"}>
        <LinkButton
          onClick={() => delProduct.mutate()}
          colorVariant={"danger"}
          size={"large"}
        >
          Yes
        </LinkButton>
        <LinkButton
          onClick={() => router.push("/products")}
          colorVariant={"secondary"}
          size={"large"}
        >
          No
        </LinkButton>
      </div>
    </div>
  );
}
