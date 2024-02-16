import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "components/Providers";
import Navigation from "components/Navigation";
import AuthWrapper from "components/Auth/AuthWrapper";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Admin",
  description: "Welcome to E-commerce app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          "max-w-screen-2xl mx-auto bg-blue-900"
        )}
      >
        <Providers>
          <main
            className={
              "flex flex-col md:flex-row bg-blue-900 min-h-screen py-2 px-2"
            }
          >
            <AuthWrapper>
              <Navigation />
              <div className={"text-blue-900 bg-white grow rounded-lg"}>
                {children}
              </div>
            </AuthWrapper>
          </main>
        </Providers>
      </body>
    </html>
  );
}
