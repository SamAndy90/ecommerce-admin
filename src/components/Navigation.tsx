"use client";

import Link from "next/link";
import clsx from "clsx";
import { BsShop, BsArchive } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { usePathname } from "next/navigation";
export default function Navigation() {
  const pathname = usePathname();

  return (
    <aside className={"py-2"}>
      <Link
        className={"flex text-white gap-1 items-baseline py-2 pl-3 pr-3 mb-3"}
        href={"/"}
      >
        <BsShop />
        <span>EcommerceAdmin</span>
      </Link>
      <nav className={"text-white"}>
        <Link
          className={clsx(
            "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-l-lg",
            pathname === "/" ? "bg-white text-blue-900" : "text-white"
          )}
          href={"/"}
        >
          <AiOutlineHome />
          <span>Dashboard</span>
        </Link>{" "}
        <Link
          className={clsx(
            "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-l-lg",
            pathname.includes("/products")
              ? "bg-white text-blue-900"
              : "text-white"
          )}
          href={"/products"}
        >
          <BsArchive />
          <span>Products</span>
        </Link>
        <Link
          className={clsx(
            "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-l-lg",
            pathname.includes("/categories")
              ? "bg-white text-blue-900"
              : "text-white"
          )}
          href={"/categories"}
        >
          <FiList />
          <span>Categories</span>
        </Link>
        <Link
          href={"/orders"}
          className={clsx(
            "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-l-lg",
            pathname.includes("/orders")
              ? "bg-white text-blue-900"
              : "text-white"
          )}
        >
          <HiOutlineQueueList />
          <span>Orders</span>
        </Link>
        <Link
          href={"/settings"}
          className={clsx(
            "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-l-lg",
            pathname.includes("/settings")
              ? "bg-white text-blue-900"
              : "text-white"
          )}
        >
          <IoSettingsOutline />
          <span>Settings</span>
        </Link>
        <Link
          href={"/example-uploader"}
          className={clsx(
            "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-l-lg",
            pathname.includes("/settings")
              ? "bg-white text-blue-900"
              : "text-white"
          )}
        >
          <span>Example-uploader</span>
        </Link>
      </nav>
    </aside>
  );
}
