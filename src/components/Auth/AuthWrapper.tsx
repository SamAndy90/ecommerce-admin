"use client";

import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";
import LoginForm from "./LoginForm";
import { Loader } from "common/Loader";

export default function AuthWrapper({ children }: PropsWithChildren) {
  const session = useSession();

  return (
    <>
      {session.status === "authenticated" && children}
      {(!session || session.status === "loading") && (
        <div className="flex min-h-screen items-center mx-auto justify-center">
          <Loader className={{ icon: "text-blue-100" }} />
        </div>
      )}
      {session.status === "unauthenticated" && (
        <div className="flex min-h-screen items-center mx-auto justify-center w-full">
          <LoginForm />
        </div>
      )}
    </>
  );
}
