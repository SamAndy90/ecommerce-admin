import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "components/Providers";
import Navigation from "components/Navigation";
import Login from "components/Login";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Welcome to E-commerce app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Login>
            <main className={"flex bg-blue-900 p-2 min-h-screen"}>
              <Navigation />
              <div className={"text-blue-900 bg-white flex-grow rounded-lg"}>
                {children}
              </div>
            </main>
          </Login>
        </Providers>
      </body>
    </html>
  );
}
