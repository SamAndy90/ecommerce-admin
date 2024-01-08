"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Login({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4 bg-blue-900">
        <button
          onClick={() => {
            signIn("google");
          }}
          className={
            "rounded-xl px-6 py-2 bg-white text-black hover:text-blue-900 transition-colors"
          }
        >
          Sign in with Google
        </button>
      </main>
    );
  }

  return <>{children}</>;
}
