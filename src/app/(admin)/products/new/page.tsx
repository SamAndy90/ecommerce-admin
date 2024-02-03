import { Title } from "common/Title";
import ProductForm from "components/Products/ProductForm";

export default function New() {
  return (
    <div>
      <Title className={"mb-4"}>Create New Product</Title>
      <ProductForm />
    </div>
  );
}
