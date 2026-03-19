import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authenticate to Launchpad",
};

export default function AuthPage() {
  return <h1 className="text-4xl">Login</h1>;
}
