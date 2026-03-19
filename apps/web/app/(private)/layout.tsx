import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { SessionProvider } from "@/contexts/session-context";
import { getSession } from "@/lib/session";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = (await headers()).get("cookie") ?? "";
  const { data } = await getSession(cookie);

  if (!data) {
    redirect("/auth");
  }

  return <SessionProvider initialSession={data}>{children}</SessionProvider>;
}
