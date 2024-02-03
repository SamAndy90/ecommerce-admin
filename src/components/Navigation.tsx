"use client";

import Link from "next/link";
import clsx from "clsx";
import { BsShop, BsArchive } from "react-icons/bs";
import { FiList, FiMenu } from "react-icons/fi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { AiOutlineHome } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { ButtonBase } from "common/ui";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { TbX } from "react-icons/tb";
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;
    body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  function logout() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <aside className={"py-1 md:py-2 relative md:basis-48 shrink-0"}>
      <ButtonBase
        type={"button"}
        className={{
          button: "block appearance-none md:hidden absolute top-3 left-3",
        }}
        onClick={() => setIsMenuOpen(true)}
        title={"Open mobile menu"}
      >
        <FiMenu
          className={
            "size-8 stroke-2 text-white hover:text-blue-200 transition-colors"
          }
        />
      </ButtonBase>
      <Link
        className={
          "flex justify-center text-white gap-1 items-baseline py-2 pl-3 pr-3 md:mb-3"
        }
        href={"/"}
      >
        <BsShop />
        <span className={"whitespace-nowrap"}>E-Commerce Admin</span>
      </Link>
      <nav className={"text-white hidden md:block"}>
        <Link
          className={clsx(
            "flex gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-l-lg",
            pathname === "/" ? "bg-white text-blue-900" : "text-white group"
          )}
          href={"/"}
        >
          <AiOutlineHome
            className={"group-hover:-translate-x-1 transition-transform"}
          />
          <span>Dashboard</span>
        </Link>{" "}
        <Link
          className={clsx(
            "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-l-lg",
            pathname.includes("/products")
              ? "bg-white text-blue-900"
              : "text-white group"
          )}
          href={"/products"}
        >
          <BsArchive
            className={"group-hover:-translate-x-1 transition-transform"}
          />
          <span>Products</span>
        </Link>
        <Link
          className={clsx(
            "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-l-lg",
            pathname.includes("/categories")
              ? "bg-white text-blue-900"
              : "text-white group"
          )}
          href={"/categories"}
        >
          <FiList
            className={"group-hover:-translate-x-1 transition-transform"}
          />
          <span>Categories</span>
        </Link>
        <Link
          href={"/orders"}
          className={clsx(
            "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-l-lg",
            pathname.includes("/orders")
              ? "bg-white text-blue-900"
              : "text-white group"
          )}
        >
          <HiOutlineQueueList
            className={"group-hover:-translate-x-1 transition-transform"}
          />
          <span>Orders</span>
        </Link>
        <Link
          href={"/settings"}
          className={clsx(
            "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-l-lg",
            pathname.includes("/settings")
              ? "bg-white text-blue-900"
              : "text-white group"
          )}
        >
          <IoSettingsOutline
            className={"group-hover:-translate-x-1 transition-transform"}
          />
          <span>Settings</span>
        </Link>
        <ButtonBase
          onClick={logout}
          className={{
            button: clsx(
              "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-l-lg group"
            ),
          }}
        >
          <CiLogout
            className={"group-hover:-translate-x-1 transition-transform"}
          />
          <span>Logout</span>
        </ButtonBase>
      </nav>
      <div
        className={clsx(
          "fixed md:hidden bottom-0 left-0 top-0 z-40 flex min-w-full flex-col items-stretch gap-y-6 bg-blue-900 p-2 pt-10 shadow-xl transition-transform",
          {
            "-translate-x-full": !isMenuOpen,
          }
        )}
      >
        <ButtonBase
          className={{
            button: "absolute left-5 top-5 appearance-none md:hidden",
          }}
          onClick={() => setIsMenuOpen(false)}
        >
          <TbX
            className={
              "size-6 text-white hover:text-blue-200 transition-colors"
            }
          />
        </ButtonBase>
        <nav className={"text-white mt-4"}>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className={clsx(
              "flex gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-lg",
              pathname === "/" ? "bg-white text-blue-900" : "text-white group"
            )}
            href={"/"}
          >
            <AiOutlineHome
              className={"group-hover:-translate-x-1 transition-transform"}
            />
            <span>Dashboard</span>
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className={clsx(
              "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-lg",
              pathname.includes("/products")
                ? "bg-white text-blue-900"
                : "text-white group"
            )}
            href={"/products"}
          >
            <BsArchive
              className={"group-hover:-translate-x-1 transition-transform"}
            />
            <span>Products</span>
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className={clsx(
              "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-lg",
              pathname.includes("/categories")
                ? "bg-white text-blue-900"
                : "text-white group"
            )}
            href={"/categories"}
          >
            <FiList
              className={"group-hover:-translate-x-1 transition-transform"}
            />
            <span>Categories</span>
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            href={"/orders"}
            className={clsx(
              "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-lg",
              pathname.includes("/orders")
                ? "bg-white text-blue-900"
                : "text-white group"
            )}
          >
            <HiOutlineQueueList
              className={"group-hover:-translate-x-1 transition-transform"}
            />
            <span>Orders</span>
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            href={"/settings"}
            className={clsx(
              "flex  gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-lg",
              pathname.includes("/settings")
                ? "bg-white text-blue-900"
                : "text-white group"
            )}
          >
            <IoSettingsOutline
              className={"group-hover:-translate-x-1 transition-transform"}
            />
            <span>Settings</span>
          </Link>
          <ButtonBase
            onClick={() => {
              setIsMenuOpen(false);
              logout();
            }}
            className={{
              button: clsx(
                "flex gap-1 items-center pr-2 mb-2 py-2 pl-3 rounded-lg group"
              ),
            }}
          >
            <CiLogout
              className={"group-hover:-translate-x-1 transition-transform"}
            />
            <span>Logout</span>
          </ButtonBase>
        </nav>
      </div>
    </aside>
  );
}
