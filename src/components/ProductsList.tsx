import { LinkButton } from "common/ui/Buttons/LinkButton";
import { ProductType } from "data-fetchers/products";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import Link from "next/link";

type ProductsListProps = {
  data: ProductType[];
};

export default function ProductsList({ data }: ProductsListProps) {
  return (
    <div className={"flex flex-col gap-y-2"}>
      {data.map((product) => {
        const { title, description, _id } = product;
        return (
          <div
            className={
              "flex items-center p-1 rounded-md border border-blue-900"
            }
            key={_id}
          >
            <div className={"flex-1 flex divide-x divide-blue-900"}>
              <div className={"basis-52 px-3"}>{title}</div>
              <div className={"flex-1 px-3"}>{description}</div>
            </div>
            <div className={"flex gap-2"}>
              <Link href={`products/edit/${_id}`}>
                <LinkButton className={{ button: "flex gap-1 items-center" }}>
                  <FiEdit />
                  Edit
                </LinkButton>
              </Link>
              <Link href={`products/delete/${_id}`}>
                <LinkButton
                  className={{ button: "flex gap-1 items-center" }}
                  colorVariant={"danger"}
                >
                  <IoTrashOutline />
                  Delete
                </LinkButton>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
