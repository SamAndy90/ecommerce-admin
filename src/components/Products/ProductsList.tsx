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
    <div className={"flex flex-col gap-y-2 overflow-y-scroll max-h-screen"}>
      {data.map((product) => {
        const { title, description, _id } = product;
        return (
          <div
            className={
              "flex items-center p-1 rounded-md border border-blue-900"
            }
            key={_id}
          >
            <div
              className={"flex-1 flex items-center divide-x divide-blue-900"}
            >
              <div className={"sm:basis-44 md:basis-48 lg:basis-52 px-3"}>
                {title}
              </div>
              <div
                className={
                  "hidden sm:[display:-webkit-box] flex-1 px-3 line-clamp-2"
                }
              >
                {description}
              </div>
            </div>
            <div className={"flex lg:flex-row flex-col gap-y-1 gap-x-2"}>
              <Link href={`products/edit/${_id}`}>
                <LinkButton
                  className={{
                    button: "flex gap-1 items-center justify-center w-full",
                  }}
                >
                  <FiEdit />
                  Edit
                </LinkButton>
              </Link>
              <Link href={`products/delete/${_id}`}>
                <LinkButton
                  className={{
                    button: "flex gap-1 items-center justify-center w-full",
                  }}
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
