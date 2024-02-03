"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "data-fetchers/orders";
import { Loader } from "common/Loader";

export default function OrdersList() {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  return (
    <div className={"flex flex-col gap-y-2 overflow-y-scroll max-h-screen"}>
      {isLoading && <Loader />}
      {isSuccess &&
        data.map((order) => {
          const {
            _id,
            fullname,
            email,
            city,
            country,
            postalcode,
            street,
            cart_items,
            paid,
            createdAt,
          } = order;
          const date = createdAt ? new Date(createdAt).toLocaleString() : "";
          return (
            <div className={"p-1 rounded-md border border-blue-900"} key={_id}>
              <div className={"flex divide-x divide-blue-900"}>
                <div
                  className={
                    "flex-1 flex flex-col md:flex-row md:divide-none divide-y pr-1 divide-blue-900 overflow-hidden"
                  }
                >
                  <div className={"md:basis-28 py-1 px-3"}>{date}</div>
                  <div className={"flex-1 py-1 px-3 font-medium"}>
                    {cart_items.map((item) => {
                      return (
                        <p key={item.price_data.product_data.name}>
                          {item.price_data.product_data.name} x{item.quantity}
                        </p>
                      );
                    })}
                  </div>
                  <div className={"flex-1 py-1 px-3"}>
                    <p>{fullname}</p>
                    <p className={"text-ellipsis overflow-hidden"}>{email}</p>
                    <p>
                      {city} {postalcode} {country}
                    </p>
                    <p>{street}</p>
                  </div>
                </div>
                <div
                  className={
                    "basis-16 sm:basis-20 flex justify-center items-center px-3"
                  }
                >
                  {paid ? (
                    <span className={"text-green-700 font-medium"}>Yes</span>
                  ) : (
                    <span className={"text-red-500 font-medium"}>No</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
