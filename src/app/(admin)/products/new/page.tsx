import { Title } from "common/Title";
import ProductForm from "components/ProductForm";
import { createProduct } from "data-fetchers/products";

export default function New() {
  return (
    <div>
      <Title className={"mb-4"}>New Product</Title>
      <ProductForm />
    </div>
  );
}
