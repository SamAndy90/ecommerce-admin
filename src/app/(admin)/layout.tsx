import Layout from "components/Layout";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return <Layout>{children}</Layout>;
}
