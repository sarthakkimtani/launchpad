import type { Metadata } from "next";

import { Auth } from "@/components/pages/auth";

export const metadata: Metadata = {
  title: "Authenticate to Launchpad",
};

export default async function AuthPage() {
  return <Auth />;
}
