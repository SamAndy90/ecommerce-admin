import { Title } from "common/Title";
import { mongoConnect } from "lib/mongo-connect";
import Admin from "models/Admin";
import Category from "models/Category";
import Order from "models/Order";
import Product from "models/Product";

export async function Dashboard() {
  await mongoConnect();
  const productsCount = await Product.find().countDocuments();
  const categoriesCount = await Category.find().countDocuments();
  const ordersCount = await Order.find().countDocuments();
  const adminsCount = await Admin.find().countDocuments();

  return (
    <div className={"md:max-w-xl"}>
      <Title className={"mb-4"}>Statistics</Title>
      <ul className={"flex flex-col gap-y-2"}>
        <li
          className={
            "flex px-1 font-semibold text-xl mb-2 bg-blue-100 divide-x divide-blue-900 py-3 rounded-md border border-blue-900"
          }
        >
          <span className={"flex-1 px-3"}>Name</span>
          <span className={"basis-24 text-center px-3"}>Count</span>
        </li>
        <li
          className={
            "flex items-center divide-x divide-blue-900 rounded-md border border-blue-900 p-1"
          }
        >
          <span className={"flex-1 px-3 text-xl font-medium"}>Products</span>
          <span className={"basis-24 text-center text-lg"}>
            {productsCount}
          </span>
        </li>
        <li
          className={
            "flex items-center divide-x divide-blue-900 rounded-md border border-blue-900 p-1"
          }
        >
          <span className={"flex-1 px-3 text-xl font-medium"}>Categories</span>
          <span className={"basis-24 text-center text-lg"}>
            {categoriesCount}
          </span>
        </li>
        <li
          className={
            "flex items-center divide-x divide-blue-900 rounded-md border border-blue-900 p-1"
          }
        >
          <span className={"flex-1 px-3 text-xl font-medium"}>Orders</span>
          <span className={"basis-24 text-center text-lg"}>{ordersCount}</span>
        </li>
        <li
          className={
            "flex items-center divide-x divide-blue-900 rounded-md border border-blue-900 p-1"
          }
        >
          <span className={"flex-1 px-3 text-xl font-medium"}>
            Administrators
          </span>
          <span className={"basis-24 text-center text-lg"}>{adminsCount}</span>
        </li>
      </ul>
    </div>
  );
}
