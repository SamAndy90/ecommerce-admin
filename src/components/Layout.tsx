"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import noIMG from "./images/emptyIMG.webp";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const noName = "User";

  return (
    <>
      <div className={"flex items-center justify-between gap-1 p-1"}>
        <h2>
          Hello
          <span className={"font-semibold"}>
            , {session?.user?.name || noName}
          </span>
        </h2>
        <div
          className={
            "flex gap-1 items-center min-w-max sm:basis-32 sm:pr-2 rounded-full sm:rounded-none sm:rounded-l-lg sm:rounded-tr-lg overflow-hidden bg-gray-100"
          }
        >
          <div className={"aspect-square relative w-10"}>
            <Image
              src={session?.user?.image! || noIMG}
              alt={"Avatar"}
              fill
              className={"object-cover"}
            />
          </div>
          <h2
            className={
              "font-medium hidden sm:block text-center flex-1 whitespace-nowrap"
            }
          >
            {session?.user?.name || noName}
          </h2>
        </div>
      </div>
      <div className={"p-2"}>{children}</div>
    </>
  );
}
