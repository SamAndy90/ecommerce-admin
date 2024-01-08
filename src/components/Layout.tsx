"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  return (
    <>
      <div className={"flex items-center justify-between p-1"}>
        <h2>
          Hello, <span className={"font-semibold"}>{session?.user?.name}</span>
        </h2>
        <div
          className={
            "flex gap-1 items-center pr-2 rounded-l-2xl overflow-hidden"
          }
        >
          <Image
            src={session?.user?.image!}
            alt={"Avatar"}
            width={40}
            height={40}
          />
          <h2 className={"font-medium"}>{session?.user?.name}</h2>
        </div>
      </div>
      <div className={"p-2"}>{children}</div>
    </>
  );
}
