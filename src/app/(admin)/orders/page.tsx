import { Title } from "common/Title";
import OrdersList from "components/OrdersList";

export default function OrdersPage() {
  return (
    <div className={"flex flex-col gap-4"}>
      <Title>Orders</Title>
      <div
        className={
          "flex px-1 font-semibold text-xl bg-blue-100 divide-x divide-blue-900 py-3 rounded-md border border-blue-900"
        }
      >
        <div className={"hidden md:block md:basis-28 px-3"}>Date</div>
        <div className={"md:hidden flex-1 px-3"}>Data</div>
        <div className={"hidden md:block flex-1 px-3"}>Product</div>
        <div className={"hidden md:block flex-1 px-3"}>Recipient</div>
        <div className={"basis-16 sm:basis-20 px-3"}>Paid</div>
      </div>
      <OrdersList />
    </div>
  );
}
