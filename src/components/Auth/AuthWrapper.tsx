"use client";

import { useSession } from "next-auth/react";
import RegisterForm from "./RegisterForm";
import { PropsWithChildren, useState } from "react";
import LoginForm from "./LoginForm";
import { Loader } from "common/Loader";

export type AuthType = "registration" | "login";

export default function AuthWrapper({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthType>("login");
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
        <div className="flex min-h-screen items-center mx-auto justify-center">
          {authState === "login" && (
            <LoginForm changeAuthState={setAuthState} />
          )}
          {authState === "registration" && (
            <RegisterForm changeAuthState={setAuthState} />
          )}
        </div>
      )}
    </>
  );
}
