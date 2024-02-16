"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import noAvatar from "components/images/emptyIMG.webp";

export function UserInfo() {
  const { data } = useSession();
  if (!data) return;

  return (
    <div className={"flex gap-4 py-4"}>
      <div
        className={
          "relative rounded-2xl w-1/3 aspect-square overflow-hidden group"
        }
      >
        <Image
          src={data.user?.image || noAvatar}
          alt={"Avatar"}
          fill
          className={"object-cover"}
        />
      </div>
      <div className={"flex-1 py-2"}>
        <p className={"text-2xl font-medium"}>{data.user?.name || "User"}</p>
        <p className={"text-gray-500"}>{data.user?.email}</p>
      </div>
    </div>
  );
}
